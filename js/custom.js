 $(document).ready(function() {

            const sidebar = $('#sidebar');
            const overlay = $('#overlay');
            const openBtn = $('#open-sidebar');
            const closeBtn = $('#close-sidebar');
            function openMenu() {
                overlay.removeClass('hidden'); // إظهار الخلفية
                sidebar.removeClass('-translate-x-full'); // تحريك القائمة للداخل
            }

            function closeMenu() {
                sidebar.addClass('-translate-x-full'); // إخفاء القائمة
                overlay.addClass('hidden'); // إخفاء الخلفية
            }

            openBtn.click(openMenu);
            closeBtn.click(closeMenu);
            overlay.click(closeMenu); // الإغلاق عند الضغط في الخارج

            //slider 
            const $track = $('#slider-track');
    const $slides = $track.children();
    const slideCount = $slides.length;
    let currentIndex = 0;
    $slides.each(function(index) {
        // النقطة الأولى تكون مميزة (bg-primary وطويلة)
        const activeClass = index === 0 ? 'bg-primary w-8' : 'bg-gray-600 w-3 hover:bg-gray-400';
        
        $('#slider-dots').append(`
            <button class="dot h-3 rounded-full transition-all duration-300 ${activeClass}" data-index="${index}"></button>
        `);
    });
    function updateSlider(index) {
        // تحريك الشريط
        const translateX = -(index * 100); 
        $track.css('transform', `translateX(${translateX}%)`);

        // تحديث شكل النقاط
        $('.dot').each(function(i) {
            if (i === index) {
                $(this).removeClass('bg-gray-600 w-3 hover:bg-gray-400').addClass('bg-primary w-8');
            } else {
                $(this).removeClass('bg-primary w-8').addClass('bg-gray-600 w-3 hover:bg-gray-400');
            }
        });
    }

    // زر التالي
    $('#next-slide').click(function() {
        currentIndex = (currentIndex + 1) % slideCount; // لو وصل للأخير يرجع للأول
        updateSlider(currentIndex);
    });

    // زر السابق
    $('#prev-slide').click(function() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount; // لو وصل للأول يرجع للأخير
        updateSlider(currentIndex);
    });

    // الضغط على النقاط
    $(document).on('click', '.dot', function() {
        currentIndex = $(this).data('index');
        updateSlider(currentIndex);
    });
    
    // (اختياري) تشغيل تلقائي كل 5 ثواني
    setInterval(function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider(currentIndex);
    }, 5000);
        });