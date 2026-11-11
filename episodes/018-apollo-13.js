// 3D episode. Models are simplified and not to scale.
const TANK = [300, 0, 0], VOLT = [600, 0, 0], TEMP = [900, 0, 0], SEA = [0, -900, 0];

function setBeam(k, m, a, b) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b);
  m.position.copy(A).add(B).multiplyScalar(0.5); m.scale.z = Math.max(.01, A.distanceTo(B));
  m.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 0, 1), B.sub(A).normalize());
  return m;
}
const bar = (m, hgt) => { m.scale.y = Math.max(.01, hgt); m.position.y = hgt / 2; };

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const silver = mat('#C9CED6', { metal: .6, rough: .35 }), dark = mat('#22252B'), gold = mat('#D9A441', { metal: .5, rough: .5 });
  const w = {};
  // --- deep space ---
  w.stars = group();
  for (let i = 0; i < 80; i++) ball(.9, mat('#FFFFFF', { glow: 2 }), [-280 + (i * 97) % 560, -200 + (i * 53) % 480, -340 - (i * 31) % 80], w.stars).castShadow = false;
  w.moon = ball(60, mat('#9A9A9A', { rough: 1 }), [130, 90, -260]); w.moon.castShadow = w.moon.receiveShadow = false;
  w.earth = ball(16, mat('#2B6CB0', { rough: .9 }), [-120, -70, -280]); w.earth.castShadow = w.earth.receiveShadow = false;
  // --- the spacecraft: service module, command module, lunar module docked nose to nose ---
  w.ship = group();
  const sm = cyl(6, 6, 22, silver, [0, 0, 0], w.ship); sm.rotation.z = Math.PI / 2;
  const bell = cyl(2, 4.4, 6, dark, [-14, 0, 0], w.ship); bell.rotation.z = -Math.PI / 2;
  const cm = cone(6, 10, mat('#DDE2EA', { metal: .5 }), [16, 0, 0], w.ship); cm.rotation.z = -Math.PI / 2;
  w.lm = group([27, 0, 0], w.ship);
  w.lmBody = box(9, 9, 9, gold, [0, 0, 0], w.lm); box(6, 6, 6, silver, [6, 0, 0], w.lm);
  for (const [y, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) setBeam(k, box(.6, .6, 1, gold, [0, 0, 0], w.lm), [4, y * 4, z * 4], [12, y * 9, z * 9]);
  w.panel = box(11, .6, 7, silver, [2, 6.2, 0], w.ship);
  w.gas = group([2, 7, 0], w.ship);
  for (let i = 0; i < 12; i++) ball(1, mat('#EAF2FF', { rough: 1, opacity: .85 }), [0, 0, 0], w.gas);
  w.flash = ball(3, mat('#FFE27A', { glow: 4 }), [2, 6, 0], w.ship);

  // --- the oxygen tank, cut away ---
  w.tank = group(TANK);
  const shell = ball(12, mat('#AEB9C7', { metal: .5, opacity: .28 }), [0, 12, 0], w.tank); shell.castShadow = false;
  w.oxy = ball(10.6, mat('#7FD0FF', { opacity: .35 }), [0, 12, 0], w.tank); w.oxy.castShadow = false;
  w.heater = cyl(1, 1, 16, mat('#FF7A1A', { glow: .2 }), [-2.5, 12, 0], w.tank);
  cyl(.5, .5, 18, silver, [3, 12, 0], w.tank);
  w.fan = group([3, 5, 0], w.tank); box(6, .4, 1.2, dark, [0, 0, 0], w.fan); box(1.2, .4, 6, dark, [0, 0, 0], w.fan);
  w.wires = [[2.2, 21, 0, 2.6, 6, .8], [3.8, 21, 0, 3.4, 6, -.8]].map(a => setBeam(k, box(.35, .35, 1, mat('#2E7D32'), [0, 0, 0], w.tank), a.slice(0, 3), a.slice(3)));
  w.arc = ball(1.2, mat('#FFFFFF', { glow: 5 }), [3, 6.4, 0], w.tank);
  box(30, 1, 30, mat('#3B4658'), [0, -.5, 0], w.tank);

  // --- voltage bars ---
  w.volts = group(VOLT);
  box(34, 1, 14, mat('#3B4658'), [0, -.5, 0], w.volts);
  w.v28 = box(7, 1, 7, mat('#39D98A', { glow: .5 }), [-7, 0, 0], w.volts); w.v65 = box(7, 1, 7, mat('#FF3B30', { glow: .7 }), [7, 0, 0], w.volts);
  // --- temperature bars ---
  w.temps = group(TEMP);
  box(34, 1, 14, mat('#3B4658'), [0, -.5, 0], w.temps);
  w.tGauge = box(7, 1, 7, mat('#39C6FF', { glow: .5 }), [-7, 0, 0], w.temps); w.tReal = box(7, 1, 7, mat('#FF5A1F', { glow: .8 }), [7, 0, 0], w.temps);

  // --- splashdown ---
  w.sea = group(SEA);
  const water = box(900, 2, 900, mat('#1F6FA8', { rough: .6 }), [0, -1, 0], w.sea); water.castShadow = false;
  w.capsule = group([0, 30, 0], w.sea);
  cone(5, 7, mat('#DDE2EA', { metal: .4 }), [0, 0, 0], w.capsule);
  for (let i = 0; i < 3; i++) { const a = i * 2.094, px = Math.cos(a) * 9, pz = Math.sin(a) * 9; const c = ball(7, mat(i % 2 ? '#FFFFFF' : '#FF7A1A', { double: true }), [px, 26, pz], w.capsule); c.scale.y = .55; setBeam(k, box(.15, .15, 1, mat('#FFFFFF'), [0, 0, 0], w.capsule), [0, 3.5, 0], [px, 24, pz]); }
  return w;
}

const SPACE = ['stars', 'moon', 'earth', 'ship'];
// blast 0..1: the panel leaves and gas vents
function ship(w, k, t, blast = 0, lifeboat = 0) {
  w.ship.rotation.set(.15, -.5 + t * .03, .12 + blast * .25 * Math.sin(t * 3));
  w.panel.position.set(2 + blast * 6, 6.2 + blast * 26, blast * 10); w.panel.rotation.set(blast * 2.4, 0, blast * 1.7);
  w.gas.visible = blast > 0;
  w.gas.children.forEach((b, i) => { const a = i * 2.4, r = blast * (4 + (i % 4) * 5); b.position.set(Math.cos(a) * r * .6, r, Math.sin(a) * r * .6); b.scale.setScalar(.5 + blast * (1.5 + i % 3)); b.material.opacity = .85 * (1 - blast * .5); });
  w.flash.visible = blast > 0 && blast < .25; w.flash.scale.setScalar(1 + blast * 8);
  w.lmBody.material.emissive.set(lifeboat ? '#39D98A' : '#000000'); w.lmBody.material.emissiveIntensity = lifeboat * (.6 + .3 * Math.sin(t * 6));
}
// heat 0..1: heater glows, oxygen boils off, wire insulation goes from green to bare
function tank(w, k, t, heat, arc = 0) {
  w.heater.material.emissiveIntensity = .2 + heat * 2.6;
  w.oxy.scale.setScalar(1 - heat * .5); w.oxy.material.color.set(heat > .5 ? '#FFB37A' : '#7FD0FF');
  w.wires.forEach(x => x.material.color.set(heat > .7 ? '#B08D57' : '#2E7D32'));
  w.fan.rotation.y = arc ? t * 14 : 0;
  w.arc.visible = arc > 0 && Math.sin(t * 40) > -.2; w.arc.scale.setScalar(1 + arc * 3);
}

export default {
  id: '018',
  style: '3d',
  voice: 'v2',
  case: 'APOLLO 13',
  year: 'ON THE WAY TO THE MOON · 1970',
  hook: ['A 28-VOLT SWITCH.', '65 VOLTS WENT IN.'],
  title: 'The switch that nearly killed the Apollo 13 crew',
  description: 'On April 14, 1970 (UTC), about 330,000 km from Earth, oxygen tank 2 on Apollo 13 failed. Its thermostatic switches were designed for 28 volts but ground equipment supplied 65; overheating during a ground procedure most likely damaged wire insulation. The crew returned safely on April 17.',
  tags: ['space', 'apollo13', 'nasa', 'engineeringfailure', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Apollo 13" — https://en.wikipedia.org/wiki/Apollo_13 (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'Two days into the flight to the Moon, an oxygen tank on Apollo {13|thirteen} burst. The cause was set up before launch, on the ground.',
      show: SPACE, sky: '#05070D', lightAt: [8, 0, 0], lightDist: 70,
      cam: { pos: [60, 26, 100], look: [10, 2, 0], fov: 42, to: { pos: [36, 20, 70], look: [8, 4, 0], fov: 38 } },
      label: (t) => t > 4.2 ? 'OXYGEN TANK *BURSTS*' : '',
      update: (w, p, t, k) => ship(w, k, t, k.h.win(t, 4, 6.5)),
    },
    {
      say: 'Inside the tank were heater switches designed for {28|twenty-eight} volts. The ground equipment at the launch site supplied {65.|sixty-five.}',
      show: ['volts'], sky: '#1D2B45', lightAt: [600, 6, 0], lightDist: 40,
      cam: { pos: [600, 12, 62], look: [600, 7, 0], fov: 40, to: { pos: [612, 14, 54], look: [600, 7, 0] } },
      label: (t) => t < 4.6 ? 'SWITCH RATED: *28 V*' : 'SUPPLIED: *65 V*', note: 'BAR HEIGHTS TO SCALE',
      update: (w, p, t, k) => { bar(w.v28, 5.6 * k.h.win(t, 2, 3)); bar(w.v65, 13 * k.h.win(t, 4.8, 6)); },
    },
    {
      say: 'During a ground test, the tank would not empty. So its heaters were switched on, to boil the oxygen off.',
      show: ['tank'], sky: '#12263A', lightAt: [300, 12, 0], lightDist: 40,
      cam: { pos: [326, 26, 54], look: [300, 12, 0], fov: 40, to: { pos: [316, 18, 44], look: [300, 12, 0], fov: 36 } },
      label: (t) => t < 3.2 ? 'TANK WOULD *NOT EMPTY*' : 'HEATERS: *ON*', note: 'CUT-AWAY · SIMPLIFIED',
      update: (w, p, t, k) => tank(w, k, t, k.h.win(t, 3.2, 6.5) * .6),
    },
    {
      say: 'Inside, the temperature may have reached {1,000|a thousand} degrees Fahrenheit. The gauge could not read above {85.|eighty-five.}',
      show: ['temps'], sky: '#3A1C1C', lightAt: [900, 10, 0], lightDist: 50,
      cam: { pos: [900, 14, 74], look: [900, 11, 0], fov: 42, to: { pos: [914, 18, 66], look: [900, 11, 0] } },
      label: (t) => t < 4.2 ? 'INSIDE: UP TO *1,000°F*' : 'GAUGE LIMIT: *85°F*', note: 'BAR HEIGHTS TO SCALE',
      update: (w, p, t, k) => { bar(w.tReal, 22 * k.h.win(t, .6, 3)); bar(w.tGauge, 22 * .085 * k.h.win(t, 4.2, 5)); },
    },
    {
      say: 'That heat most likely damaged the insulation on wires inside the tank.',
      show: ['tank'], sky: '#3A2414', lightAt: [300, 12, 0], lightDist: 40,
      cam: { pos: [312, 20, 30], look: [302, 13, 0], fov: 34, to: { pos: [308, 16, 22], look: [302.6, 12, 0], fov: 30 } },
      label: 'INSULATION *DAMAGED*',
      update: (w, p, t, k) => tank(w, k, t, .6 + .4 * k.h.win(t, 0, 2)),
    },
    {
      say: 'In space, {330,000|three hundred and thirty thousand} kilometers from Earth, the crew switched on the tank\'s fan. The wires arced, and the tank burst.',
      show: SPACE, sky: '#05070D', lightAt: [8, 0, 0], lightDist: 70,
      cam: { pos: [-40, 34, 80], look: [4, 4, 0], fov: 42, to: { pos: [-20, 44, 70], look: [4, 10, 0], fov: 40 } },
      label: (t) => t < 5 ? '*330,000 KM* FROM EARTH' : 'FAN ON → *ARC*',
      shake: (t) => t > 6.2 && t < 7.4 ? .5 : 0,
      update: (w, p, t, k) => ship(w, k, t, k.h.win(t, 6.2, 9)),
    },
    {
      say: 'The three astronauts used the lunar module as a lifeboat.',
      show: SPACE, sky: '#05070D', lightAt: [8, 0, 0], lightDist: 70,
      cam: { pos: [100, 26, 100], look: [18, 0, 0], fov: 40, to: { pos: [84, 20, 86], look: [20, 0, 0], fov: 38 } },
      label: 'LIFEBOAT: *LUNAR MODULE*',
      update: (w, p, t, k) => ship(w, k, t, 1, 1),
    },
    {
      say: 'They splashed down safely on {April 17th,|April seventeenth,} {1970.|nineteen seventy.}',
      show: ['sea'], sky: '#8FCBEA', lightAt: [0, -880, 0], lightDist: 80,
      cam: { pos: [50, -880, 90], look: [0, -872, 0], fov: 44, to: { pos: [30, -888, 70], look: [0, -884, 0] } },
      label: 'ALL *3* SURVIVED',
      update: (w, p, t, k) => { w.capsule.position.y = 34 - k.h.win(t, 0, 4.5) * 30; w.capsule.rotation.z = Math.sin(t * 1.6) * .06; },
    },
    {
      say: 'Quick question. Who was the commander of Apollo {13?|thirteen?} A, Neil Armstrong. B, Jim Lovell. Or C, Buzz Aldrin. Comment your answer.',
      quiz: { q: 'Who was the commander of Apollo 13?', options: ['Neil Armstrong', 'Jim Lovell', 'Buzz Aldrin'], answer: 'B — Jim Lovell. The crew was James Lovell, Jack Swigert and Fred Haise.' },
      show: ['sea'], sky: '#274B73', lightAt: [0, -880, 0], lightDist: 80,
      cam: { pos: [40, -800, 120], look: [0, -960, 0], fov: 46, to: { pos: [-40, -800, 120], look: [0, -960, 0] } },
      update: (w, p, t) => { w.capsule.position.y = 4 + Math.sin(t * 1.5) * .4; },
    },
  ],
};
