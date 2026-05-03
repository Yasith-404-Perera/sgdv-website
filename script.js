/* ═══ HERO THREE.JS — White Kelaniya-style Stupa ═══════════════════ */
(function(){
  const c=document.getElementById('hero-canvas');
  const r=new THREE.WebGLRenderer({canvas:c,antialias:true,alpha:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  r.setClearColor(0x1a0f05,1);
  const s=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(60,1,.1,100);
  cam.position.z=5;
  let isHeroMobile=false,sg;
  function applyHeroStupaLayout(){
    if(!sg)return;
    sg.scale.setScalar(isHeroMobile?.34:1);
    sg.position.z=isHeroMobile?-1.95:-1.5;
  }
  function rsz(){const w=c.parentElement.offsetWidth,h=c.parentElement.offsetHeight;isHeroMobile=w<700;r.setSize(w,h);cam.aspect=w/h;cam.position.z=isHeroMobile?6.2:5;cam.updateProjectionMatrix();applyHeroStupaLayout();}
  rsz();window.addEventListener('resize',rsz);

  // Lighting — warm ambient + directional for white stupa
  s.add(new THREE.AmbientLight(0xfff5e8,.7));
  const dl=new THREE.DirectionalLight(0xfff0d4,1.8);dl.position.set(2,5,3);s.add(dl);
  const dl2=new THREE.DirectionalLight(0xd4c5a0,.4);dl2.position.set(-3,2,1);s.add(dl2);

  // Stupa group
  sg=new THREE.Group();
  const white=(ro=.55)=>new THREE.MeshStandardMaterial({color:0xf5f2ec,metalness:.05,roughness:ro});
  const gold=(ro=.3)=>new THREE.MeshStandardMaterial({color:0xd4af37,metalness:.65,roughness:ro});

  // Base platforms — 3 tiered circular steps
  const addBase=(rt,rb,h,y)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,48),white(.65));m.position.y=y;sg.add(m);};
  addBase(1.55,1.65,.12,-2.35);
  addBase(1.4,1.55,.12,-2.2);
  addBase(1.25,1.4,.12,-2.05);

  // Main dome — bell shape (Kelaniya style)
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1.0,48,48,0,Math.PI*2,0,Math.PI*.6),white(.45));
  dome.position.y=-1.15;sg.add(dome);

  // Dome base ring — decorative gold band
  const domeRing=new THREE.Mesh(new THREE.TorusGeometry(1.0,.035,12,48),gold(.2));
  domeRing.rotation.x=Math.PI/2;domeRing.position.y=-1.7;sg.add(domeRing);

  // Harmika (square box on top)
  const hk=new THREE.Mesh(new THREE.BoxGeometry(.42,.25,.42),white(.5));
  hk.position.y=-.18;sg.add(hk);
  // Gold band on harmika
  const hkRing=new THREE.Mesh(new THREE.BoxGeometry(.44,.03,.44),gold(.25));
  hkRing.position.y=-.05;sg.add(hkRing);

  // Chhatravali — concentric gold rings (cone shape)
  const chatMat=new THREE.MeshStandardMaterial({color:0xd4af37,metalness:.7,roughness:.15});
  const rings=[.24,.21,.18,.15,.12,.09,.065,.04];
  rings.forEach((rv,i)=>{
    const m=new THREE.Mesh(new THREE.TorusGeometry(rv,.022,8,32),chatMat);
    m.rotation.x=Math.PI/2;m.position.y=.08+i*.15;sg.add(m);
  });
  // Cone spine through rings
  const spine=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,rings.length*.15,8),gold(.2));
  spine.position.y=.08+(rings.length*.15)/2-.075;sg.add(spine);

  // Pinnacle — gold cone tip
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.035,.25,12),new THREE.MeshStandardMaterial({color:0xd4af37,metalness:.85,roughness:.08,emissive:0xd4af37,emissiveIntensity:.2}));
  tip.position.y=1.35;sg.add(tip);

  // Crystal — glowing top gem
  const crystal=new THREE.Mesh(new THREE.SphereGeometry(.05,12,12),new THREE.MeshStandardMaterial({color:0xfffde0,emissive:0xffd700,emissiveIntensity:2.5,roughness:0,metalness:.2,transparent:true,opacity:.9}));
  crystal.position.y=1.5;sg.add(crystal);

  sg.position.set(0,-.3,-1.5);applyHeroStupaLayout();s.add(sg);

  // Decorative rings in background
  const mk=new THREE.MeshBasicMaterial({color:0xd4af37,transparent:true,opacity:.12});
  const ring1=new THREE.Mesh(new THREE.TorusGeometry(1.8,.006,8,120),mk);ring1.position.z=-2;s.add(ring1);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.7,.004,8,120),new THREE.MeshBasicMaterial({color:0xd4af37,transparent:true,opacity:.07}));ring2.position.z=-2;s.add(ring2);

  // Floating particles
  const N=200,pos=new Float32Array(N*3),vel=[];
  for(let i=0;i<N;i++){pos[i*3]=(Math.random()-.5)*14;pos[i*3+1]=(Math.random()-.5)*10;pos[i*3+2]=(Math.random()-.5)*4-2;vel.push({x:(Math.random()-.5)*.003,y:Math.random()*.005+.002,o:Math.random()*Math.PI*2});}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xd4af37,size:.05,transparent:true,opacity:.6,sizeAttenuation:true}));s.add(pts);

  let mx=0,my=0;
  window.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2;});
  let t=0;
  (function anim(){requestAnimationFrame(anim);t+=.07;
    sg.position.y=(isHeroMobile?-3.1:-.3)+Math.sin(t*.4)*.025;sg.position.x=mx*.1;sg.rotation.y=mx*.07;
    ring1.rotation.z=t*.03;ring2.rotation.z=-t*.02;ring1.position.x=mx*.04;ring1.position.y=-my*.04;
    crystal.material.emissiveIntensity=2+Math.sin(t*2)*.8;
    const p=pg.attributes.position.array;
    for(let i=0;i<N;i++){p[i*3]+=vel[i].x+Math.sin(t+vel[i].o)*.0015;p[i*3+1]+=vel[i].y;if(p[i*3+1]>6){p[i*3+1]=-6;p[i*3]=(Math.random()-.5)*14;}}
    pg.attributes.position.needsUpdate=true;r.render(s,cam);
  })();
})();

/* ═══ STUPA PARALLAX — White Kelaniya Stupa with Moon ═════════════ */
(function(){
  const c=document.getElementById('sp-canvas');
  const r=new THREE.WebGLRenderer({canvas:c,antialias:true,alpha:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));r.setClearColor(0x0a0610,1);
  const s=new THREE.Scene();
  s.fog=new THREE.FogExp2(0x0a0610,.055);
  const cam=new THREE.PerspectiveCamera(55,1,.1,100);cam.position.z=6;
  function rsz(){const w=c.parentElement.offsetWidth,h=c.parentElement.offsetHeight;r.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();}
  rsz();window.addEventListener('resize',rsz);

  // Lighting
  s.add(new THREE.AmbientLight(0xc8d0ff,.3));
  const ml=new THREE.PointLight(0xfff5d4,.6,30);ml.position.set(2.8,2.6,-3);s.add(ml);
  const sp=new THREE.SpotLight(0xeee8d0,2.5,25,Math.PI/5,.6);sp.position.set(0,8,5);s.add(sp);

  // Moon
  const moon=new THREE.Mesh(new THREE.SphereGeometry(.7,32,32),new THREE.MeshStandardMaterial({color:0xfff9e8,emissive:0xffeebb,emissiveIntensity:.6,roughness:1}));
  moon.position.set(2.8,2.6,-4);s.add(moon);
  const halo=new THREE.Mesh(new THREE.TorusGeometry(.95,.05,8,64),new THREE.MeshBasicMaterial({color:0xffeebb,transparent:true,opacity:.18}));
  halo.position.copy(moon.position);s.add(halo);
  const halo2=new THREE.Mesh(new THREE.RingGeometry(.85,1.4,48),new THREE.MeshBasicMaterial({color:0xffeebb,transparent:true,opacity:.04,side:THREE.DoubleSide}));
  halo2.position.copy(moon.position);s.add(halo2);

  // Big white stupa
  const sg=new THREE.Group();
  const wh=(ro=.5)=>new THREE.MeshStandardMaterial({color:0xf0ede6,metalness:.05,roughness:ro});
  const gd=(ro=.25)=>new THREE.MeshStandardMaterial({color:0xd4af37,metalness:.7,roughness:ro});

  // Base platforms
  const ab=(rt,rb,h,y)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,48),wh(.6));m.position.y=y;sg.add(m);};
  ab(2.4,2.7,.3,-3.1);
  ab(2.1,2.4,.28,-2.75);
  ab(1.8,2.1,.25,-2.4);
  // Gold band on each tier
  [(-3.1+.15),(-2.75+.14),(-2.4+.125)].forEach((y,i)=>{
    const rad=[2.4,2.1,1.8][i];
    const band=new THREE.Mesh(new THREE.TorusGeometry(rad,.025,8,48),gd(.2));
    band.rotation.x=Math.PI/2;band.position.y=y;sg.add(band);
  });

  // Main dome
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1.55,48,48,0,Math.PI*2,0,Math.PI*.58),wh(.4));
  dome.position.y=-1.35;sg.add(dome);
  // Gold band at dome base
  const dRing=new THREE.Mesh(new THREE.TorusGeometry(1.5,.03,12,48),gd(.15));
  dRing.rotation.x=Math.PI/2;dRing.position.y=-2.15;sg.add(dRing);

  // Harmika
  const hk=new THREE.Mesh(new THREE.BoxGeometry(.6,.3,.6),wh(.5));hk.position.y=-.22;sg.add(hk);
  const hkB=new THREE.Mesh(new THREE.BoxGeometry(.64,.04,.64),gd(.2));hkB.position.y=-.06;sg.add(hkB);

  // Chhatravali — tapering rings
  const cm=gd(.12);
  const rr=[.32,.28,.24,.2,.16,.12,.09,.065,.045,.03];
  rr.forEach((rv,i)=>{
    const m=new THREE.Mesh(new THREE.TorusGeometry(rv,.025,8,32),cm);
    m.rotation.x=Math.PI/2;m.position.y=.12+i*.2;sg.add(m);
  });

  // Pinnacle cone
  const tipm=new THREE.Mesh(new THREE.ConeGeometry(.05,.45,12),gd(.08));tipm.position.y=2.35;sg.add(tipm);
  // Crystal orb
  const tg=new THREE.Mesh(new THREE.SphereGeometry(.08,12,12),new THREE.MeshStandardMaterial({color:0xfffde0,emissive:0xffd700,emissiveIntensity:2.5,roughness:0,transparent:true,opacity:.95}));
  tg.position.y=2.62;sg.add(tg);

  sg.position.set(0,-2,-1);s.add(sg);

  // Stars
  const N=300,sp2=new Float32Array(N*3);
  for(let i=0;i<N;i++){sp2[i*3]=(Math.random()-.5)*22;sp2[i*3+1]=(Math.random()-.5)*14;sp2[i*3+2]=(Math.random()-.5)*6-2;}
  const pg2=new THREE.BufferGeometry();pg2.setAttribute('position',new THREE.BufferAttribute(sp2,3));
  const stars=new THREE.Points(pg2,new THREE.PointsMaterial({color:0xeee8d0,size:.04,transparent:true,opacity:.55,sizeAttenuation:true}));s.add(stars);

  let mx2=0,my2=0;
  window.addEventListener('mousemove',e=>{mx2=(e.clientX/innerWidth-.5)*2;my2=(e.clientY/innerHeight-.5)*2;});
  let t=0;
  (function anim(){requestAnimationFrame(anim);t+=.008;
    const band=document.getElementById('sp-band'),rect=band.getBoundingClientRect();
    const prog=(innerHeight/2-rect.top)/innerHeight;
    sg.position.y=-2+prog*.9;sg.rotation.y=t*.04+mx2*.05;
    moon.position.x=2.8+mx2*.12;moon.position.y=2.6-my2*.08;
    halo.position.copy(moon.position);halo.rotation.z=t*.15;
    halo2.position.copy(moon.position);
    stars.rotation.y=t*.004;
    tg.material.emissiveIntensity=2+Math.sin(t*3)*.7;
    r.render(s,cam);
  })();
})();

/* ═══ UI ══════════════════════════════════════════════════════════ */
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');}),{threshold:.1});
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>io.observe(el));
// nav
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('sc',scrollY>60);document.getElementById('bktop').classList.toggle('sh',scrollY>400);});
// back top
document.getElementById('bktop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
// hero scroll
document.getElementById('hscroll').onclick=()=>document.getElementById('intro').scrollIntoView({behavior:'smooth'});
// hamburger
const hbg=document.getElementById('hbg'),mm=document.getElementById('mmenu');
const mobileMq=window.matchMedia('(max-width: 800px)');
function closeMenu(){
  hbg.classList.remove('op');
  mm.classList.remove('op');
  hbg.setAttribute('aria-expanded','false');
  mm.setAttribute('aria-hidden','true');
  document.body.classList.remove('menu-open');
}
function toggleMenu(){
  const open=!mm.classList.contains('op');
  hbg.classList.toggle('op',open);
  mm.classList.toggle('op',open);
  hbg.setAttribute('aria-expanded',open?'true':'false');
  mm.setAttribute('aria-hidden',open?'false':'true');
  document.body.classList.toggle('menu-open',open);
}
function syncMobileMode(){
  document.body.classList.toggle('is-mobile',mobileMq.matches);
  if(!mobileMq.matches)closeMenu();
}
hbg.onclick=toggleMenu;
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
mobileMq.addEventListener?.('change',syncMobileMode);
syncMobileMode();
// custom cursor
const cd=document.getElementById('cdot'),cr=document.getElementById('cring');
if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{cd.style.left=e.clientX+'px';cd.style.top=e.clientY+'px';cr.style.left=e.clientX+'px';cr.style.top=e.clientY+'px';});
  document.querySelectorAll('a,button,.cc,.tc2,.gi').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cr.style.width='50px';cr.style.height='50px';cr.style.opacity='1';});
    el.addEventListener('mouseleave',()=>{cr.style.width='32px';cr.style.height='32px';cr.style.opacity='.55';});
  });
}else{
  cd.style.display='none';
  cr.style.display='none';
}
// contact form
document.getElementById('cform').onsubmit=function(e){e.preventDefault();this.style.display='none';document.getElementById('fsucc').style.display='block';setTimeout(()=>{this.style.display='grid';document.getElementById('fsucc').style.display='none';this.reset();},5000);};
// modals open
document.querySelectorAll('[data-modal]').forEach(el=>el.addEventListener('click',()=>document.getElementById(el.dataset.modal)?.classList.add('op')));
// modal close buttons
document.querySelectorAll('.mcl').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.movo').classList.remove('op')));
// modal overlay click close
document.querySelectorAll('.movo').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('op');}));
// modal enroll buttons -> scroll to contact
document.querySelectorAll('.menr[data-goto]').forEach(btn=>btn.addEventListener('click',()=>{btn.closest('.movo').classList.remove('op');setTimeout(()=>document.getElementById(btn.dataset.goto).scrollIntoView({behavior:'smooth'}),300);}));
// lightbox
const giItems=[...document.querySelectorAll('.gi[data-src]')];
const lbEl=document.getElementById('lb'),lbImg=document.getElementById('lbimg'),lbCt=document.getElementById('lbct');
let lbI=0;
function openLb(i){lbI=i;lbImg.src=giItems[i].dataset.src;lbCt.textContent=(i+1)+' / '+giItems.length;lbEl.classList.add('op');document.body.style.overflow='hidden';}
function closeLb(){lbEl.classList.remove('op');document.body.style.overflow='';}
giItems.forEach((it,i)=>it.addEventListener('click',()=>openLb(i)));
document.getElementById('lbcl').onclick=closeLb;
lbEl.addEventListener('click',e=>{if(e.target===lbEl)closeLb();});
document.getElementById('lbpv').onclick=()=>openLb((lbI-1+giItems.length)%giItems.length);
document.getElementById('lbnx').onclick=()=>openLb((lbI+1)%giItems.length);
document.addEventListener('keydown',e=>{
  if(!lbEl.classList.contains('op')&&!document.querySelector('.movo.op'))return;
  if(e.key==='Escape'){closeLb();document.querySelectorAll('.movo.op').forEach(m=>m.classList.remove('op'));}
  if(lbEl.classList.contains('op')){if(e.key==='ArrowLeft')openLb((lbI-1+giItems.length)%giItems.length);if(e.key==='ArrowRight')openLb((lbI+1)%giItems.length);}
});
