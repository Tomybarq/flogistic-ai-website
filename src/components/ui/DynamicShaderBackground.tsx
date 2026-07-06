"use client";

import React, { useEffect, useRef } from "react";

// Vertex shader blueprint extracted from the rendering setup
const VERTEX_SHADER_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;

// Complete Raymarching Custom Fragment Shader
const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
uniform vec2 wheel;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+wheel.y/1e3)
#define S smoothstep
#define N normalize 
#define MN min(R.x,R.y)
#define PI radians(180.)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
#define hue(a) (.5+.5*sin(6.3*(a)+vec3(1,2,3)))

float box(vec3 p, vec3 s, float r) {
	p=abs(p)-s+r;
	return length(max(p,.0))+min(.0,max(max(p.x,p.y),p.z))-r;
}

float smin(float a, float b, float k) {
	float h=clamp(.5+.5*(b-a)/k,.0,1.);
	return mix(b,a,h)-k*h*(1.-h);
}

float cuts(vec3 p, float k, float f) {
	return min(
		box(p,vec3(k,k,f),.05),
		box(p.zyx,vec3(k,k,f),.05)
	);
}

float map(vec3 p) {
	float r=2.8, a=atan(p.x,p.z);
	vec2 q=vec2(length(p.xz)-r,p.y);
	q*=rot(.5*a+T);
	q.y=abs(q.y)-.2;
	q.y=abs(q.y)-.2;
	float d=box(q.xyy,vec3(.7,.05,1.+sin(a)*.5+.5),.05);
	return smin(-cuts(p,5.,.2),d,-.05);
}

vec3 norm(vec3 p) {
	float h=1e-3; vec2 k=vec2(-1,1);
	return N(
		k.xyy*map(p+k.xyy*h)+
		k.yxy*map(p+k.yxy*h)+
		k.yyx*map(p+k.yyx*h)+
		k.xxx*map(p+k.xxx*h)
	);
}

bool march(inout vec3 p, vec3 rd, out float dd) {
	for (float i = 0.0; i<400.; i++) {
		float d=map(p);
		if (abs(d)<1e-3) return true;
		if (d>100.) return false;
		p+=rd*d*.5;
		dd+=d*.5;
	}
	return false;
}

float calcAO(vec3 p, vec3 n) {
	float occ=.0, sca=1.;
	for (float i=.0; i<5.; i++) {
		float
		h=.01+i*.05,
		d=map(p+h*n);
		occ+=(h-d)*sca;
		sca*=.95;
		if (occ>.35) break;
	}
	return clamp(1.-3.*occ,.0,1.)*(.5+.5*n.y);
}

float shadow(vec3 p, vec3 lp) {
	float shd=1., maxd=distance(lp,p);
	vec3 l=N(lp-p);
	for (float i=1e-3; i<maxd;) {
		float d=map(p+l*i);
		if (d<1e-3) {
			shd=.0;
			break;
		}
		shd=min(shd,16.*d/i);
		i+=d;
	}
	return shd;
}

vec3 org(inout vec3 t) {
	vec3 p=t-vec3(0,-.5,12);
	p.yz*=rot(.78-.5*sin(move.y*6.3/MN));
	p.xz*=rot(.78-move.x*6.3/MN);
	return p;
}

vec3 dir(vec2 uv, vec3 p, vec3 t, float z) {
	vec3 up=vec3(0,1,0),
	f=N(t-p),
	r=N(cross(up,f)),
	u=N(cross(f,r));
	return mat3(r,u,f)*N(vec3(uv,z));
}

vec3 render(vec2 uv) {
	vec3 col=vec3(0),
	t=vec3(0,-.5,0), p=org(t), ro=p,
	rd=dir(uv,p,t,2.);
	float dd = 0.0;
	if (march(p,rd,dd)) {
		vec3 n=norm(p), lp=vec3(0,3,0), l=N(lp-p),
		e=N(ro-p), r=reflect(-l,n);
		float ao=calcAO(p,n), amb=1.+10.*n.y, ld=distance(ro,p),
		dif=clamp(dot(l,n),.0,1.), atten=1./(1.+ld*.25+ld*ld*.125),
		shd=shadow(p+n*5e-2,lp), ref=pow(clamp(dot(r,e),.0,1.),8.);
		col+=dif*shd;
		col+=clamp(dot(-rd,l),.0,1.)*atten;
		col+=ref;
		col*=hue(T*.2-.4*length(p))+amb*ao*atten;
		col=col*2./(2.+col);
	}
	return col;
}

void main() {
	vec2 uv=(FC-.5*R)/MN;
	vec3 col=render(uv);
	O=vec4(col,1);
}`;

export default function DynamicShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL2 is not supported by this browser.");
      return;
    }

    // High performance device resolution multipliers
    const resolutionScale = 0.5; 
    let dpr = Math.max(1, resolutionScale * window.devicePixelRatio); 

    // State structural logic tracking variables
    let startTime = performance.now(); 
    let animationFrameId: number;
    let mouseMove = [0, 0]; 
    let wheelDelta = 0; 
    let wheelOffset = 0; 
    let isPointerActive = false; 
    let lastPointerX = 0; 
    let lastPointerY = 0; 

    // Compile Helper Routine
    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs); 
    gl.attachShader(program, fs); 
    gl.linkProgram(program); 

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // Geometry buffers assignment
    const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]); 
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position"); 
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0); 

    // Uniform structural locations map
    const uResolution = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");
    const uMove = gl.getUniformLocation(program, "move");
    const uWheel = gl.getUniformLocation(program, "wheel"); 

    // Viewport resizing routine
    const handleResize = () => {
      const width = window.innerWidth; 
      const height = window.innerHeight; 
      canvas.width = width * dpr; 
      canvas.height = height * dpr; 
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Interactive pointer surface event structures
    const onPointerDown = (e: PointerEvent) => {
      isPointerActive = true; 
      lastPointerX = e.clientX; 
      lastPointerY = e.clientY; 
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerActive) return; 
      mouseMove[0] += e.clientX - lastPointerX; 
      mouseMove[1] += lastPointerY - e.clientY; 
      lastPointerX = e.clientX; 
      lastPointerY = e.clientY; 
    };

    const onPointerUp = () => {
      isPointerActive = false; 
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t; 

    const onWheel = (e: WheelEvent) => {
      if (wheelDelta * e.deltaY < 0) { 
        wheelDelta = e.deltaY; 
      } else {
        wheelDelta = lerp(wheelDelta, e.deltaY, 0.05); 
      }
      wheelOffset += wheelDelta; 
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp); 
    canvas.addEventListener("wheel", onWheel, { passive: true }); 

    // Core Animation loop cycle execution
    const loop = (now: number) => {
      const elapsedTime = now - startTime; 

      gl.clearColor(0, 0, 0, 1); 
      gl.clear(gl.COLOR_BUFFER_BIT); 
      gl.useProgram(program); 

      // Set Shader Uniform updates
      gl.uniform2f(uResolution, canvas.width, canvas.height); 
      gl.uniform1f(uTime, elapsedTime * 1e-3); 
      gl.uniform2f(uMove, mouseMove[0], mouseMove[1]); 
      gl.uniform2f(uWheel, wheelDelta, wheelOffset); 

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 

      animationFrameId = requestAnimationFrame(loop); 
    };

    animationFrameId = requestAnimationFrame(loop); 

    // Garbage collection & context cleanup to prevent leaks
    return () => {
      cancelAnimationFrame(animationFrameId); 
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);

      gl.detachShader(program, vs); 
      gl.detachShader(program, fs); 
      gl.deleteShader(vs); 
      gl.deleteShader(fs); 
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program); 
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-screen block touch-none pointer-events-auto bg-[#05070A]"
      style={{ zIndex: -1 }}
    />
  );
}
