/* ======================================================= */
/* 0. منطق زر "ابدئي الرحلة" (التحكم في القفل والتشغيل) 🆕 */
/* ======================================================= */

const startJourneyBtn = document.getElementById("startJourneyBtn");
const body = document.body;

startJourneyBtn.addEventListener("click", function(e) {
    e.preventDefault(); // منع انتقال الرابط الافتراضي مؤقتاً

    // 1. تشغيل الموسيقى
    const music = document.getElementById("bgMusic");
    music.currentTime = 20; // تبدأ من 20 ثانية
    music.play().catch(error => {
        console.log("المتصفح منع التشغيل التلقائي:", error);
        // يمكن إضافة رسالة للمستخدم للضغط على أي مكان لتشغيل الصوت
    });

    // 2. إلغاء قفل التمرير وإظهار محتوى الصفحة
    body.classList.remove("scroll-locked");
    
    // 3. التمرير إلى القسم الأول من القصة (#story)
    setTimeout(() => {
        const storySection = document.getElementById("story");
        if (storySection) {
            storySection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500); // تأخير بسيط لضمان إزالة القفل أولاً
});


/* ======================================================= */
/* 1. منطق معرض الذكريات (Slider) النظيف */
/* ======================================================= */

const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// نحتاج إلى إعادة حساب عرض الشريحة في كل مرة يتم استخدامها
function getSlideWidth() {
     return slides.length > 0 ? slides[0].clientWidth : 0;
}

// وظيفة تحديث موقع شريط التمرير
function updateSlider() {
    const slideWidth = getSlideWidth();
    if (slideWidth > 0) {
        // يحرك شريط التمرير أفقيًا بمقدار (الشريحة الحالية * عرض الشريحة)
        const offset = -currentSlide * slideWidth;
        sliderTrack.style.transform = `translateX(${offset}px)`;
    }
}

// السلايدر يعمل بشكل دائري (Loop)
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// ربط الأزرار بالوظائف
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// تحديث عرض الشريحة عند تغيير حجم الشاشة
window.addEventListener('resize', () => {
    updateSlider();
});

// تشغيل تلقائي للسلايدر (اختياري، 5 ثواني)
if (slides.length > 1) {
    setInterval(nextSlide, 5000);
}


/* ======================================================= */
/* 2. منطق زر "لا" الذي يتحرك بلطف */
/* ======================================================= */

const noBtn = document.getElementById('no-btn');

if (noBtn) {
    noBtn.addEventListener('mouseover', (e) => {
        // نحصل على أبعاد وحالة زر "لا"
        const rect = noBtn.getBoundingClientRect();

        // نحدد منطقة حركة معقولة (مثلاً ضمن 300 بكسل أفقيًا و 150 بكسل رأسيًا من موقعه الأصلي)
        const movementRangeX = 300;
        const movementRangeY = 150;

        // نولد إحداثيات عشوائية جديدة ضمن هذه المنطقة
        // يتم استخدام (Math.random() - 0.5) * 2 لإنشاء رقم عشوائي بين -1 و 1
        const newPosX = (Math.random() - 0.5) * movementRangeX;
        const newPosY = (Math.random() - 0.5) * movementRangeY;

        // تطبيق الحركة باستخدام transform
        noBtn.style.position = 'relative'; // ليعمل الـ translate بشكل صحيح داخل الأب
        noBtn.style.transition = 'transform 0.4s ease-out';
        noBtn.style.transform = `translate(${newPosX}px, ${newPosY}px) rotateZ(${(Math.random() - 0.5) * 8}deg)`; // دوران أكبر قليلاً
    });

    noBtn.addEventListener('click', (e) => {
        // رسالة لطيفة إذا حاول المستخدم الضغط على "لا"
        e.preventDefault();
        alert("هل أنتِ متأكدة من أنكِ تريدين محاولة الضغط على (لا)؟ حاولي مجددًا 😉");
        
        // إعادة الزر إلى مكانه الأصلي بعد الضغط
        noBtn.style.transform = 'translate(0, 0) rotateZ(0deg)';
    });
}


/* ===========================ئ============================ */
/* 3. منطق زر "نعم" (رسالة تهنئة) */
/* ======================================================= */

const yesBtn = document.getElementById('yes-btn');

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        alert("أعلم أنكِ ستقولين نعم! أحبكِ جدًا! بدأت قصتنا للتو ❤️");
        // يمكن إضافة منطق آخر هنا، مثل إخفاء الأزرار أو إعادة توجيه الصفحة
    });
}