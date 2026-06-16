// --- TARGET TIMELINE COUNTDOWN ---
const targetTimelineDate = new Date("2026-06-18T00:00:00").getTime();

function computeTimelineTicker() {
    const currentMomentTime = new Date().getTime();
    const temporalDistance = targetTimelineDate - currentMomentTime;
    
    if (temporalDistance <= 0) {
        document.getElementById('targetDays').innerText = "0";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        document.getElementById('seconds').innerText = "00";
        return;
    }
    
    let remainingDays = Math.floor(temporalDistance / (1000 * 60 * 60 * 24));
    let remainingHours = Math.floor((temporalDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let remainingMinutes = Math.floor((temporalDistance % (1000 * 60 * 60)) / (1000 * 60));
    let remainingSeconds = Math.floor((temporalDistance % (1000 * 60)) / 1000);
    
    document.getElementById('targetDays').innerText = remainingDays;
    document.getElementById('hours').innerText = String(remainingHours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(remainingMinutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(remainingSeconds).padStart(2, '0');
}

setInterval(computeTimelineTicker, 1000);
computeTimelineTicker();

// --- FALLING HEARTS ANIMATION SYSTEM ---
function spawnFallingHearts() {
    const container = document.getElementById('fallingHeartsLayer');
    const heartIcons = ['♥', '💖', '❤️', '💕', '❣'];
    const maxHeartsCount = 45;
    
    setInterval(() => {
        if (container.childElementCount >= maxHeartsCount) return;

        const heartNode = document.createElement('div');
        heartNode.className = 'falling-heart';
        heartNode.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heartNode.style.left = Math.random() * 100 + 'vw';
        heartNode.style.fontSize = (Math.random() * 14 + 10) + 'px';
        
        const duration = Math.random() * 6 + 6; 
        heartNode.style.animationDuration = duration + 's';
        heartNode.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heartNode);
        setTimeout(() => { heartNode.remove(); }, duration * 1000);
    }, 250);
}
spawnFallingHearts();

// --- GEOMETRIC HEART GLOW CONTOUR CONSTRUCTOR ---
function constructGlowingContour() {
    const svgElement = document.getElementById('contourHeartSvg');
    if (!svgElement) return;
    const totalPointsCount = 90; 
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    for (let i = 0; i < totalPointsCount; i++) {
        const stepPercent = (i / totalPointsCount) * 2 * Math.PI;
        const xCoordinate = 550 + 16 * Math.pow(Math.sin(stepPercent), 3) * 27.6;
        const yCoordinate = 470 - (13 * Math.cos(stepPercent) - 5 * Math.cos(2 * stepPercent) - 2 * Math.cos(3 * stepPercent) - Math.cos(4 * stepPercent)) * 27.6;
        
        const groupWrap = document.createElementNS(svgNamespace, "g");
        const randomAngle = (Math.random() * 30) - 15;
        groupWrap.setAttribute("transform", `translate(${xCoordinate}, ${yCoordinate}) rotate(${randomAngle}) translate(-12, -12)`);
        
        const useInstanceTag = document.createElementNS(svgNamespace, "use");
        useInstanceTag.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#mini-glowing-heart");
        useInstanceTag.setAttribute("transform", "scale(1)");
        
        groupWrap.appendChild(useInstanceTag);
        svgElement.appendChild(groupWrap);
    }
}
window.addEventListener('DOMContentLoaded', constructGlowingContour);

// --- MUSIC PLAYER CONTROLS ---
const myAudio = document.getElementById('romanticAudio');
const playBtnBox = document.getElementById('masterPlayBtn');
const playIconGlyph = document.getElementById('playIcon');
const trackingBar = document.getElementById('seekSlider');
const curTimeText = document.getElementById('currentTime');
const maxDurationText = document.getElementById('totalDuration');

window.addEventListener('click', () => {
    if (myAudio.paused && playIconGlyph.className === 'fa-solid fa-pause') {
        myAudio.play().catch(err => console.log("Autoplay blocked by browser policy"));
    }
}, { once: true });

function formatMinutesSeconds(secondsNum) {
    let mins = Math.floor(secondsNum / 60);
    let secs = Math.floor(secondsNum % 60);
    return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

playBtnBox.addEventListener('click', () => {
    if (myAudio.paused) {
        myAudio.play();
        playIconGlyph.className = 'fa-solid fa-pause';
    } else {
        myAudio.pause();
        playIconGlyph.className = 'fa-solid fa-play';
    }
});

myAudio.addEventListener('loadedmetadata', () => {
    trackingBar.max = myAudio.duration;
    maxDurationText.innerText = formatMinutesSeconds(myAudio.duration);
});

myAudio.addEventListener('timeupdate', () => {
    trackingBar.value = myAudio.currentTime;
    curTimeText.innerText = formatMinutesSeconds(myAudio.currentTime);
});

trackingBar.addEventListener('input', () => { 
    myAudio.currentTime = trackingBar.value; 
});

// --- PASSWORD AND VAULT MODAL LOGIC ---
function togglePasswordVault(shouldOpen) {
    const vaultWindow = document.getElementById('vaultModal');
    if (shouldOpen) {
        vaultWindow.classList.add('active');
    } else {
        vaultWindow.classList.remove('active');
        document.getElementById('vaultPasswordInput').value = "";
    }
}

function displaySecretMessage(title, text) {
    document.getElementById('secretMessageTitle').innerText = title;
    document.getElementById('secretMessageText').innerText = text;
    document.getElementById('secretMessageModal').classList.add('active');
}

function closeSecretMessage() {
    document.getElementById('secretMessageModal').classList.remove('active');
}

function verifyVaultPassword() {
    const userInputString = document.getElementById('vaultPasswordInput').value.trim();
    if (userInputString === "18/06/2025") {
        togglePasswordVault(false);
        setTimeout(() => {
            displaySecretMessage(
                "Boîte ouverte", 
                "❤️Nawwarti ya malikt 9lbi, ya dfe rouhi, w nour 3innaya ili b nadhra wa7da minha titbdl denyti lkol w tezyen fi 3ini✨❤️ Nawwarra lyoum w a7na nssakrou fil 3am keml m3a b3thna nektblk w lklem tal3 min a3m9 blassa fi 9lbi ili yerjf b 3ch9k, lmache3r ili 3ndi lik lila tfou9 kol tawa9ou3at akber w a3m9 b brcha min moujard kelmet titenta9 wlee titktb fi sstour, inti mouche moujard habibati inti skent feya 3icht fi wesst 3rou9i ya rou7 yassountk lghalya w walit nabth w l2anfess ili m5alyitni 3aych ,l3am hedha ili 3ichtou m3ak ken 3mor jdid b nessba leya 3am tmanit lou ken je ydoum mleyen snin 5ater kol thenya t3adet b janbek kent tesswa denya w mafeha🧸💍.Ya rouhi l3ziza 9bal ma yodkhol hobbek l9lbi kont nlwj 3la l2emen w def2 fi denya w teyeh bin layem w kif jit inti tbdlt denyti 180 degre 3rft ili l2emen lkol mit5abi fi sse7r 3innik w def2 lkol ma5lou9 min dho5ktk w 7anentk ili tnassini fi t3ab denya w fi kol wji3a t3adet 3leya,nhebek brcha ya nour, hob majnoun w 3ami9 ldarja inou 9lbi ydo9 bil 9wiy kol ma yji issmk fi beli,hob ykhalini n8ar 3lik 7ta min nessmt ili tit3ada bjanbk w 7ta min njoum ili tzayen fi smek w min dhaw lgamra ili yo8zr lwejhk ssem7 💋💋💋.Kol lila, nassr7 fi 5yelk w netfaker tfassilk lkol , ssoutk lehnin w deffi illi yhadi feya borken t3ab w ;amsst yedk saghrouna ili kif tchedli yedi n7ess rouhi mlekt l3alm w ma fih w tert bin njoum m3ak inti ya 3zizti nssit chnowa ma3neha 5ouf w nssit chnowa ma3neha bard 5ater 7odhnk howa watani def2 w howa lmalj2 lwa7id fi lkawn ili n7ess fih rou7i fi 9imt ra7a w touma2nina inti el Safe space mte3i ya rhy lblassa ili nohrblha min denya lkol w bich nal9a rou7i👑🌹.Inti mouche moujard chrikt 7yeti inti saghrounti lmdalla ili nkhaf 3liha min nessmt lehwe w saghrounti ili ndalelha w ne7meha w inti amiratiw mawleti ili nitcharf w nefta5r 9odem denya lkol ili 9lbi i5tark w ssannek,kol tafssila fik ta3nini w ta3ch9ha 3inni min dho7ktk l3alia ili tdhawili dhlem ayemi w tkhalini netbassm dhaye3 fi zinnek lnadhra le7nina min 3innik ili dewili kol jrou7i,inti ne3ma ili ned3i 3leha rabi kol youm fi ssleti bech ydawmha 3leya w bech may7rmnich min 7essha w dho7ktha toul 3omri 🕊️🌸. 3am keml w inti malika 3la 3arch 9lbi,3am keml w ena 8ar9 fi b7ar 3ech9k ili ma 3ndou 7doud w nou3dk 9odem rabi w 9odem 9lbi ili 3omri ma nkhalik w ili 8lewtk w 3ech9k fi 9lbi bech yzidou yekbrou m3a kol thenya tit3ada fi 3morna.Bech nab9a dima ssaned l7a9i9i lik, w rajl ili ye7mik,yfar7k,yamsse7 dmou3k w ykounlk l2emen ili ma youfech fi wakt lkhouf.Na3ch9k lekher da9a fi 9lbi, lekher nfass fi ssedri, w lekher youm fi 3omri.Kol 3am w inti habibati, kol 3am w inti denyti, w kol 3am w inti a7la w a8la w ajml ma 3ndi fi lkoun ili dhawitou inti b wjoudk ya rou7 9lbi "
            );
        }, 400);
    } else {
        displaySecretMessage("Accès Refusé", "❌ Mot de passe incorrect... Indice : C'est notre date symbolique originale au format DD/MM/YYYY !");
    }
}

// --- MORPHING GALLERY AND MEDIA DATA HUB ---
const videoHubData = [
    "VID-20251225-WA0004.mp4", "VID_20250901_211157.mp4", "Screen_Recording_20251011_223445.mp4",
    "Screen_Recording_20251017_231815.mp4", "VID-20251109-WA0001.mp4", "VID_20251115_084931_411.mp4",
    "VID-20251225-WA0002.mp4", "VID-20251225-WA0003.mp4", "VID_20260214_132032_984.mp4",
    "VID-20260312-WA0015.mp4", "VID-20260312-WA0016.mp4", "VID_20260317_170901_204.mp4",
    "VID-20260326-WA0014.mp4", "VID-20260326-WA0013.mp4", "Screen_Recording_20260401_194758.mp4",
    "VID_20260407_115145_589.mp4"
];

const souvenirHubData = [
    "lki.jpg", "IMG-20250627-WA0001(1).jpg", "IMG-20250807-WA0013(1).jpg", "kilani.jpg",
    "Screenshot_20251109-225824(1).jpg", "IMG_20251110_072634_345(2).jpg", "IMG-20260326-WA0000(1).jpg",
    "IMG-20260326-WA0005(1).jpg", "IMG-20260326-WA0009(1).jpg", "IMG-20260326-WA0011(1).jpg",
    "Screenshot_20250820-202146(1).jpg", "IMG_20250818_224216_503(1).jpg", "IMG_20250818_224220_898(1).jpg",
    "IMG_20250818_224227_445(1).jpg", "IMG_20251115_175010_885(1).jpg", "IMG_20260209_092922_302(1).jpg",
    "IMG_20260209_092925_830(1).jpg", "IMG_20260214_221509_395(1).jpg", "IMG_20260308_210043_340(1).jpg",
    "IMG_20260310_164204_591(1).jpg", "IMG_20260314_165454_339(1).jpg", "IMG-20260326-WA0002(1).jpg",
    "IMG-20260326-WA0003(1).jpg", "IMG-20260326-WA0004(1).jpg", "IMG-20260326-WA0007(1).jpg",
    "IMG-20260326-WA0010(1).jpg", "IMG-20260409-WA0000(1).jpg", "IMG-20260414-WA0001(1).jpg",
    "IMG-20260414-WA0002(1).jpg", "IMG-20260414-WA0003(1).jpg", "IMG-20260414-WA0004(1).jpg",
    "IMG-20260414-WA0006(1).jpg"
];

let currentHubType = "";
let currentHubIndex = 0;
let activeMediaElements = [];

function openHub(type) {
    currentHubType = type;
    currentHubIndex = 0;
    const titleNode = document.getElementById('hubTitle');
    const stageWrapper = document.getElementById('morphWrapper');
    stageWrapper.innerHTML = ""; 
    
    if(type === 'videos') {
        titleNode.innerText = "Nos Vidéos";
        videoHubData.forEach((src, idx) => {
            const videoNode = document.createElement('video');
            videoNode.className = `morph-item ${idx === 0 ? 'active' : ''}`;
            videoNode.src = src;
            videoNode.controls = true;
            videoNode.preload = "auto";
            stageWrapper.appendChild(videoNode);
        });
    } else {
        titleNode.innerText = "Nos Souvenirs";
        souvenirHubData.forEach((src, idx) => {
            const imgNode = document.createElement('img');
            imgNode.className = `morph-item ${idx === 0 ? 'active' : ''}`;
            imgNode.src = src;
            stageWrapper.appendChild(imgNode);
        });
    }
    
    activeMediaElements = Array.from(stageWrapper.getElementsByClassName('morph-item'));
    document.getElementById('hubModal').classList.add('active');
    
    if(type === 'videos' && activeMediaElements[0]) {
        myAudio.pause();
        playIconGlyph.className = 'fa-solid fa-play';
    }
}

function closeHub() {
    activeMediaElements.forEach(el => {
        if(el.tagName === 'VIDEO') el.pause();
    });
    document.getElementById('hubModal').classList.remove('active');
}

function navigateHub(direction) {
    if (activeMediaElements.length <= 1) return;
    const oldIndex = currentHubIndex;
    currentHubIndex = (currentHubIndex + direction + activeMediaElements.length) % activeMediaElements.length;
    
    const currentElement = activeMediaElements[oldIndex];
    const nextElement = activeMediaElements[currentHubIndex];
    
    if(currentElement.tagName === 'VIDEO') {
        currentElement.pause();
    }
    
    activeMediaElements.forEach(el => {
        el.classList.remove('exit-left', 'exit-right');
    });

    if(direction > 0) {
        currentElement.classList.add('exit-left');
    } else {
        currentElement.classList.add('exit-right');
    }
    currentElement.classList.remove('active');
    
    setTimeout(() => {
        nextElement.classList.add('active');
        if(nextElement.tagName === 'VIDEO') {
            nextElement.play().catch(e => console.log("Playback blocked natively"));
        }
    }, 50);
}