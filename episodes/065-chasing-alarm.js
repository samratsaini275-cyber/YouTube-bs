// Narrative 5: "What Would Happen If…". A made-up comedy sketch: alarm clocks cannot run (yet).
// Hook rule: the premise as a question under 2 s, first frame already showing a ringing alarm clock on legs chasing a man in pyjamas.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B79C', 0);
  // the alarm clock, with legs, eyes and very angry eyebrows
  w.clock = group([0, 0, 0]);
  w.cbody = group([0, 3.2, 0], w.clock);
  const face = cyl(1.8, 1.8, 1, mat('#E2453C', { metal: .3, rough: .3 }), [0, 0, 0], w.cbody, 32); face.rotation.x = Math.PI / 2;
  const dial = cyl(1.5, 1.5, .1, mat('#FFFFFF'), [0, 0, .52], w.cbody, 32); dial.rotation.x = Math.PI / 2;
  w.bells = [-1, 1].map(s => { const b = ball(.8, mat('#C9CED6', { metal: .8, rough: .2 }), [s * 1.1, 1.8, 0], w.cbody); b.scale.y = .7; return b; });
  w.hammer = box(.15, .9, .15, mat('#C9CED6', { metal: .8 }), [0, 2.1, 0], w.cbody);
  w.eyes = [-.55, .55].map(x => { const g = group([x, .25, .6], w.cbody); ball(.36, mat('#FFFFFF'), [0, 0, 0], g); ball(.17, mat('#111111'), [0, 0, .25], g); return g; });
  w.brows = [-.55, .55].map(x => { const b = box(.7, .14, .1, mat('#111111'), [x, .8, .62], w.cbody); b.rotation.z = x < 0 ? -.45 : .45; return b; });
  w.mouth = box(.9, .14, .1, mat('#111111'), [0, -.6, .6], w.cbody);
  w.hands = [box(.08, .8, .05, mat('#111111'), [0, .35, .58], w.cbody), box(.08, .55, .05, mat('#111111'), [.2, .1, .58], w.cbody)];
  w.hands[1].rotation.z = -1.2;
  w.legs = [-.7, .7].map(x => { const g = group([x, 1.6, 0], w.clock); cyl(.16, .16, 1.6, mat('#1E2430'), [0, -.8, 0], g, 8); box(.5, .25, .8, mat('#1E2430'), [0, -1.55, .2], g); return g; });
  // the man in pyjamas
  w.guy = group([0, 0, 0]);
  w.gbody = group([0, 0, 0], w.guy);
  cyl(1, 1.15, 3.6, mat('#7FB2E5'), [0, 3.6, 0], w.gbody, 18);
  for (let i = 0; i < 4; i++) cyl(1.02 + i * .03, 1.05 + i * .03, .25, mat('#FFFFFF'), [0, 2.2 + i * .9, 0], w.gbody, 18).castShadow = false;
  w.ghead = group([0, 6.3, 0], w.gbody);
  ball(1.05, mat('#F2C9A0'), [0, 0, 0], w.ghead);
  w.geyes = [-.38, .38].map(x => ball(.16, mat('#111111'), [x, .2, .95], w.ghead));
  w.gmouth = ball(.25, mat('#5A1E1E'), [0, -.4, .95], w.ghead);
  cone(.9, 1.8, mat('#7FB2E5'), [.2, 1.3, -.2], w.ghead, 14).rotation.z = -.5;   // nightcap
  ball(.25, mat('#FFFFFF'), [.95, 1.9, -.2], w.ghead);
  w.glegs = [-.45, .45].map(x => { const g = group([x, 1.8, 0], w.guy); cyl(.3, .3, 1.8, mat('#7FB2E5'), [0, -.9, 0], g, 10); return g; });
  // hallway
  w.hall = group([0, 0, 0]);
  w.floor = group([0, 0, 0], w.hall);
  for (let i = 0; i < 24; i++) box(4, .05, 10, mat(i % 2 ? '#B08A5E' : '#9C7A50'), [-48 + i * 4, .03, 0], w.floor).castShadow = false;
  box(200, 14, .5, mat('#E8DCC8'), [0, 7, -5], w.hall);
  w.frames = group([0, 0, 0], w.hall);
  for (let i = 0; i < 8; i++) { box(2.4, 3, .2, mat('#6B4B2E'), [-40 + i * 11, 8, -4.7], w.frames); box(2, 2.6, .25, mat(['#7FB069', '#5BC0EB', '#F7D9A8'][i % 3]), [-40 + i * 11, 8, -4.65], w.frames); }
  // bedroom
  w.bedroom = group([60, 0, 0]);
  box(30, 14, .5, mat('#D7E3F0'), [0, 7, -6], w.bedroom);
  box(8, 1.6, 12, mat('#6B4B2E'), [0, .8, -.5], w.bedroom);
  box(7.6, 1, 11.6, mat('#FFFFFF'), [0, 2, -.5], w.bedroom);
  w.quilt = box(7.8, .8, 7.5, mat('#3B5BA9'), [0, 2.6, 1.6], w.bedroom);
  box(5, .9, 2.4, mat('#FFFFFF'), [0, 2.9, -4.6], w.bedroom);
  box(3, 2.6, 3, mat('#8B5A2B'), [6, 1.3, -4], w.bedroom);
  w.window = box(6, 5, .2, mat('#9ED2F3', { glow: .3 }), [-8, 8, -5.7], w.bedroom);
  // bathroom
  w.bath = group([120, 0, 0]);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) box(2.9, 2.9, .2, mat((i + j) % 2 ? '#BFE3EA' : '#F4FAFC'), [-11 + i * 3, 1.5 + j * 3, -6], w.bath).castShadow = false;
  w.curtain = group([0, 0, -2], w.bath);
  for (let i = 0; i < 9; i++) { const c = box(1.1, 11, .2, mat(i % 2 ? '#FFD21F' : '#FFE45C'), [-4.4 + i * 1.1, 6.5, Math.sin(i) * .2], w.curtain); c.castShadow = false; }
  cyl(.1, .1, 11, mat('#C9CED6', { metal: .8 }), [0, 12.1, 0], w.curtain, 8).rotation.z = Math.PI / 2;
  w.steam = group([0, 12, -3], w.bath);
  for (let i = 0; i < 6; i++) { const s = ball(1.2, mat('#FFFFFF', { opacity: .5 }), [0, 0, 0], w.steam); s.userData = { x: -4 + i * 1.6, ph: i * .3 }; s.castShadow = false; }
  // office: the clock got there first
  w.office = group([180, 0, 0]);
  box(30, 14, .5, mat('#E6E9EE'), [0, 7, -8], w.office);
  box(8, .4, 4, mat('#8B5A2B'), [0, 4, -2], w.office);
  for (const x of [-3.6, 3.6]) box(.4, 4, 3.6, mat('#6B4B2E'), [x, 2, -2], w.office);
  box(2.4, 1.8, .2, mat('#1E2430'), [-2.6, 5.3, -2.6], w.office).rotation.y = .6;
  w.chair = group([1.5, 0, -5], w.office);
  box(2.6, .4, 2.6, mat('#2A2A2A'), [0, 2.4, 0], w.chair); box(2.6, 3, .4, mat('#2A2A2A'), [0, 4, -1.2], w.chair);
  cyl(.15, .15, 2.2, mat('#5A6070'), [0, 1.2, 0], w.chair, 8);
  w.mug = cyl(.35, .3, .7, mat('#FFFFFF'), [-2.8, 4.55, -1.4], w.office, 14);
  w.night = box(40, 20, .2, mat('#141A2A', { opacity: .5 }), [60, 8, 5]); w.night.castShadow = false;
  return w;
}

function run(w, t, x, z, o = {}) {
  const c = w.clock, s = o.fast ?? 14;
  w.brows.forEach((br, i) => { br.rotation.z = i ? .45 : -.45; br.position.y = .8; }); w.mouth.scale.x = 1; w.mouth.position.y = -.6; w.legs.forEach(g => { g.rotation.x = 0; });
  c.position.set(x, 0, z); c.rotation.y = o.yaw ?? Math.PI / 2;
  w.legs.forEach((g, i) => { g.rotation.x = o.still ? 0 : .7 * Math.sin(t * s + i * Math.PI); });
  w.cbody.position.y = 3.2 + (o.still ? 0 : .25 * Math.abs(Math.sin(t * s)));
  ring(w, t, o.ring !== false);
}
function ring(w, t, on) {
  w.cbody.rotation.z = on ? .12 * Math.sin(t * 60) : 0;
  w.hammer.rotation.z = on ? .7 * Math.sin(t * 60) : 0;
}
function flee(w, t, x, z, o = {}) {
  const g = w.guy, s = o.fast ?? 12;
  g.position.set(x, o.y ?? 0, z); g.rotation.set(o.lie ? -Math.PI / 2 : 0, o.yaw ?? Math.PI / 2, 0);
  w.glegs.forEach((l, i) => { l.rotation.x = o.still ? 0 : .8 * Math.sin(t * s + i * Math.PI); l.visible = !o.lie; });
  w.gbody.position.y = o.still ? 0 : .3 * Math.abs(Math.sin(t * s));
  w.gmouth.scale.setScalar(o.scream ? 1.6 + .3 * Math.sin(t * 20) : .7);
  w.geyes.forEach(e => e.scale.setScalar(o.wide ? 1.6 : 1));
}
function scroll(w, t, speed = 12) { w.floor.position.x = -((t * speed) % 8); w.frames.position.x = -((t * speed) % 11); }
const HALL = ['ground', 'hall', 'clock', 'guy'];

export default {
  id: '065',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ALARM THAT CHASES YOU',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF ALARMS', 'COULD CHASE YOU?'],
  title: 'What would happen if your alarm clock could chase you?',
  description: 'No more snooze. No more hiding. No more weekends. (A made-up alarm clock with legs.)',
  tags: ['whatif', 'funny', 'alarmclock', 'morning', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the running alarm clock is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if alarms could chase you?',
      show: HALL, sky: '#E8DCC8', lightAt: [0, 4, 0], lightDist: 20,
      cam: { pos: [1, 4, 34], look: [.5, 8, 0], fov: 48, to: { pos: [1, 4, 31], look: [.5, 8, 0], fov: 46 } },
      update: (w, p, t) => { scroll(w, t); run(w, t, -4.5, 0); flee(w, t, 5, 0, { scream: true }); },
    },
    {
      say: 'Hit snooze? It gets angry.',
      show: ['ground', 'bedroom', 'clock', 'guy'], sky: '#D7E3F0', lightAt: [60, 4, 0], lightDist: 16,
      cam: { pos: [67, 9, 9], look: [62, 3.5, -3.5], fov: 46, to: { pos: [66, 8.5, 7.5], look: [62, 3.5, -3.8], fov: 44 } },
      update: (w, p, t) => {
        run(w, t, 64.5, -4, { still: true, yaw: -.5, ring: t > .9 }); w.clock.position.y = 2.6;
        w.brows.forEach((b, i) => { b.rotation.z = (i ? 1 : -1) * (t > .7 ? .7 : 0); b.position.y = t > .7 ? .7 : .9; });
        flee(w, t, 60, 2.6, { lie: true, still: true, y: 3.2, yaw: 0, wide: t > .9 }); w.guy.position.z = 2.6;
      },
    },
    {
      say: 'It waits outside the shower.',
      show: ['ground', 'bath', 'clock'], sky: '#F4FAFC', lightAt: [120, 4, 0], lightDist: 16,
      cam: { pos: [127, 6, 16], look: [120, 6, -1], fov: 46, to: { pos: [126, 6, 13.5], look: [120, 6, -1], fov: 44 } },
      update: (w, p, t) => {
        run(w, t, 120 + 2.5 * Math.sin(t * 2.4), 2.5, { yaw: Math.sin(t * 2.4) > 0 ? -Math.PI / 2 : Math.PI / 2, fast: 16 });
        w.steam.children.forEach(s => { const f = (t * .5 + s.userData.ph) % 1; s.position.set(s.userData.x, f * 3, 0); s.scale.setScalar(.6 + f); });
      },
    },
    {
      say: 'It even beats you to work.',
      show: ['ground', 'office', 'clock', 'guy'], sky: '#E6E9EE', lightAt: [180, 4, 0], lightDist: 16,
      cam: { pos: [190, 7, 16], look: [181, 5, -1], fov: 46, to: { pos: [188.5, 6.8, 13.5], look: [181, 5, -1], fov: 44 } },
      update: (w, p, t) => {
        run(w, t, 181.5, -4.6, { still: true, yaw: .2, ring: false }); w.clock.position.y = 2.2;
        w.legs.forEach(g => { g.rotation.x = -1.2; });
        w.hands[0].rotation.z = -t * 2;
        flee(w, t, 191 - Math.min(t, 1) * 3, 3, { still: t > 1, yaw: -Math.PI / 2, wide: t > 1, fast: 8 });
      },
    },
    {
      say: 'Saturday? Five a.m. Just because.',
      show: ['ground', 'bedroom', 'clock', 'guy', 'night'], sky: '#0B1020', lightAt: [60, 4, 0], lightDist: 16,
      cam: { pos: [64, 7.5, 8], look: [61.3, 3.6, -3.8], fov: 46, to: { pos: [63.5, 7, 6.5], look: [61.3, 3.6, -3.8], fov: 42 } },
      shake: (t) => .12,
      update: (w, p, t) => {
        run(w, t, 62.8, -4.2, { still: true, yaw: -.3 }); w.clock.position.y = 2.7;
        w.brows.forEach((b, i) => { b.rotation.z = (i ? -1 : 1) * .3; b.position.y = .9; });
        w.mouth.scale.x = .5; w.mouth.position.y = -.5;
        flee(w, t, 59.6, 2.6, { lie: true, still: true, y: 3.2, yaw: 0, wide: true }); w.guy.position.z = 2.6;
      },
    },
    {
      say: 'Would you buy one: yes, no, or snooze? Comment below.',
      quiz: { q: 'Would you buy an alarm that chases you?', options: ['Yes', 'No', 'Snooze'], answer: 'It is a made-up alarm clock, so snooze is safe. For now.' },
      show: HALL, sky: '#274B73', lightAt: [0, 4, 0], lightDist: 20,
      cam: { pos: [14, 3, 20], look: [0, 12, 0], fov: 46, to: { pos: [-12, 3, 20], look: [0, 12, 0] } },
      update: (w, p, t) => { scroll(w, t); run(w, t, -4.5, 0); flee(w, t, 5, 0, { scream: true }); },
    },
  ],
};
