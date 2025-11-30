$(document).ready(function() {
    //side bar menu toggle
        const sidebar = $('#sidebar');
        const overlay = $('#overlay');
        const openBtn = $('#open-sidebar');
        const closeBtn = $('#close-sidebar');
    
        function openMenu() {
            overlay.removeClass('hidden'); 
            sidebar.removeClass('-translate-x-full'); 
        }
    
        function closeMenu() {
            sidebar.addClass('-translate-x-full'); 
            overlay.addClass('hidden'); 
        }
    
        openBtn.click(openMenu);
        closeBtn.click(closeMenu);
        overlay.click(closeMenu); 
    // End of sidebar menu toggle
    //side bar menu toggle
        const filterSidebar = $('#filtering-sidebar');
        const openFilterSidebarBtn = $('#open-filter-sidebar');
        const closeFilterSidebarBtn = $('#close-filter-sidebar');
    
        function openMenu() {
            overlay.removeClass('hidden'); 
            filterSidebar.removeClass('-translate-x-full'); 
        }
    
        function closeMenu() {
            filterSidebar.addClass('-translate-x-full'); 
            overlay.addClass('hidden'); 
        }
    
        openFilterSidebarBtn.click(openMenu);
        closeFilterSidebarBtn.click(closeMenu);
        overlay.click(closeMenu); 
    // End of sidebar menu toggle
    
//Image Slider Logic
    const $track = $('#slider-track');
    const $slides = $track.children();
    const slideCount = $slides.length;
    let currentIndex = 0;

    $slides.each(function(index) {
        const activeClass = index === 0 ? 'bg-primary w-8' : 'bg-gray-600 w-3 hover:bg-gray-400';
        
        $('#slider-dots').append(`
            <button class="dot h-3 rounded-full transition-all duration-300 ${activeClass}" data-index="${index}"></button>
        `);
    });

    function updateSlider(index) {
        const translateX = -(index * 100); 
        $track.css('transform', `translateX(${translateX}%)`);

        $('.dot').each(function(i) {
            if (i === index) {
                $(this).removeClass('bg-gray-600 w-3 hover:bg-gray-400').addClass('bg-primary w-8');
            } else {
                $(this).removeClass('bg-primary w-8').addClass('bg-gray-600 w-3 hover:bg-gray-400');
            }
        });
    }

    $('#next-slide').click(function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider(currentIndex);
    });

    $('#prev-slide').click(function() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider(currentIndex);
    });

    $(document).on('click', '.dot', function() {
        currentIndex = $(this).data('index');
        updateSlider(currentIndex);
    });

    setInterval(function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider(currentIndex);
    }, 5000);

            // Multi-step Booth Rental Form Logic

            let currentStep = 1;
            const totalSteps = 5;

            // Toast Notification Function (Replaces alert())
            function showToast(message, isError = true) {
                const $toastContainer = $('#toast-container');
                const colorClass = isError ? 'bg-red-600' : 'bg-primary';
                // Using Lucide icons (simple SVGs) for visual consistency
                const icon = isError ? 
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>' :
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-black"><polyline points="20 6 9 17 4 12"/></svg>';

                const $toast = $(`
                    <div class="${colorClass} text-white p-4 rounded-xl shadow-xl flex items-center gap-3 transform translate-x-full transition-all duration-300">
                        ${icon}
                        <span>${message}</span>
                    </div>
                `);

                $toastContainer.append($toast);
                
                // Animate in
                setTimeout(() => {
                    $toast.removeClass('translate-x-full');
                }, 10);

                // Animate out and remove
                setTimeout(() => {
                    $toast.addClass('translate-x-full');
                    $toast.on('transitionend', function() {
                        $(this).remove();
                    });
                }, 5000);
            }

            //  Step 3 Logic: Select Booth Mode 
            window.selectMode = function(element, value) {
                // Remove selected styles from all options
                $('.mode-option').removeClass('selected border-primary bg-[#1a1a1a] shadow-lg shadow-primary/10').addClass('border-gray-700'); 
                // Add selected styles to the clicked element
                $(element).addClass('selected border-primary bg-[#1a1a1a] shadow-lg shadow-primary/10').removeClass('border-gray-700'); 
                $('#selected-mode').val(value);
            }

            // --- Step 4 Logic: Toggle Add-on Selection ---
window.toggleAddon = function(element) {
    const $element = $(element);
    const $checkbox = $element.find('.checkbox');
    const $hiddenInput = $element.find('.addon-value'); 

    if ($element.hasClass('selected')) {
        // Deselect
        $element.removeClass('selected border-primary')
                .addClass('border-gray-800 hover:border-gray-600');

        $checkbox.html('').removeClass('bg-primary border-transparent')
                .addClass('border-gray-600');

        // مسح القيمة من الـ hidden input
        $hiddenInput.val("");
    } else {
        // Select
        $element.addClass('selected border-primary')
                .removeClass('border-gray-800 hover:border-gray-600');

        $checkbox.html(`
            <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
        `).addClass('bg-primary border-transparent')
         .removeClass('border-gray-600');

        // تخزين اسم الإضافة في الـ hidden input
        const addonName = $element.find("h3").text().trim();
        $hiddenInput.val(addonName);
    }

    if (currentStep === totalSteps) {
        calculateTotal();
    }
}



            // --- Step 5 Logic: Calculate Total Cost ---
            function calculateTotal() {
                // Get dimensions for base price calculation
                const w = parseFloat($('#width-input').val()) || 0;
                const d = parseFloat($('#depth-input').val()) || 0;
                const area = w * d;
                
                // --- Rates (Adjusted based on Country for realism) ---
                let ratePerSqM = 100; // Default (e.g., UAE)
                const selectedCountry = $('#country-select').val();
                let countryName = $('#select-text').text().trim();
                
                if (selectedCountry === 'egypt') {
                    ratePerSqM = 80;
                } else if (selectedCountry === 'ksa') {
                    ratePerSqM = 120;
                } else {
                    countryName = 'Country Not Selected';
                }

                // Base price calculation
                const basePrice = area * ratePerSqM;

                // Update review summary
                $('#review-country').text(countryName);
                $('#review-size').text(`${w}m x ${d}m (${area.toFixed(1)} m²)`);
                $('#review-mode').text($('#selected-mode').val() || 'Not Selected');
                
                // Update price breakdown
                $('#base-desc').text(`Base Rental (${area.toFixed(1)} m² x $${ratePerSqM}/m²)`);
                $('#base-price').text(`$${basePrice.toFixed(2)}`);

                // Add-ons calculation (Add-ons are priced per day. Assuming 1 day for initial quote.)
                let addonsTotal = 0;
                $('.addon-item.selected').each(function() {
                    addonsTotal += parseFloat($(this).data('price'));
                });
                $('#addons-price').text(`$${addonsTotal.toFixed(2)}`);

                // Final total
                const total = basePrice + addonsTotal;
                $('#total-price').text(`$${total.toFixed(2)}`);
            }

            // --- Stepper Navigation Logic ---

            // Function to update the UI based on currentStep
            function updateStep() {
                // Hide all content and show the current step with a fade effect
                $('.step-content').addClass('hidden');
                $(`#step-${currentStep}`).removeClass('hidden');

                // Update progress bar
                $('.progress-segment').removeClass('bg-primary').addClass('bg-gray-800');
                for(let i = 1; i <= currentStep; i++) {
                    $(`#prog-${i}`).removeClass('bg-gray-800').addClass('bg-primary');
                }

                // Handle navigation buttons (Back/Next)
                $('#prev-btn').prop('disabled', currentStep === 1).toggleClass('opacity-50', currentStep === 1);

                if (currentStep === totalSteps) {
                    $('#next-btn').addClass('hidden'); 
                    calculateTotal(); // Run calculation for Review step
                } else {
                    $('#next-btn').removeClass('hidden');
                }
            }

            // Next Button Click Handler
            $('#next-btn').click(function() {
                if (currentStep < totalSteps) {
                    // Validation checks before moving forward
                    if(currentStep === 1 && !$('#country-select').val()) { 
                        showToast('Please select an exhibition country to continue.');
                        return; 
                    }
                    
                    const width = parseFloat($('#width-input').val());
                    const depth = parseFloat($('#depth-input').val());
                    if(currentStep === 2 && (width <= 0 || isNaN(width) || depth <= 0 || isNaN(depth))) { 
                        showToast('Please enter valid, positive width and depth dimensions.');
                        return; 
                    }

                    if(currentStep === 3 && !$('#selected-mode').val()) { 
                        showToast('Please select a Booth Mode (Ready-Made, Custom, or Own Design) to proceed.');
                        return; 
                    }
                    
                    // Move to next step
                    currentStep++;
                    updateStep();
                }
            });

            // Previous Button Click Handler
            $('#prev-btn').click(function() {
                if (currentStep > 1) {
                    currentStep--;
                    updateStep();
                }
            });

            // --- Custom Select Dropdown Logic (Step 1) ---
            const $trigger = $('#select-trigger');
            const $optionsMenu = $('#select-options');
            const $options = $optionsMenu.find('li');
            const $hiddenInput = $('#country-select');
            const $selectText = $('#select-text');
            const $arrow = $('#arrow-icon');

            $trigger.click(function(e) {
                e.stopPropagation();
                $optionsMenu.toggleClass('hidden');
                $arrow.toggleClass('rotate-180');
                // Use ring for better focus indication
                $trigger.toggleClass('ring-2 ring-primary border-primary'); 
            });

            $options.click(function() {
                const value = $(this).data('value');
                const text = $(this).text().trim();
                
                $hiddenInput.val(value);
                $selectText.text(text).removeClass('text-gray-400').addClass('text-white');
                
                $optionsMenu.addClass('hidden');
                $arrow.removeClass('rotate-180');
                $trigger.removeClass('ring-2 ring-primary border-primary');
            });

            $(document).click(function(e) {
                if (!$(e.target).closest('#custom-country-select').length) {
                    $optionsMenu.addClass('hidden');
                    $arrow.removeClass('rotate-180');
                    $trigger.removeClass('ring-2 ring-primary border-primary');
                }
            });
            
            // --- Step 2: Auto-calculate Area ---
            $('#width-input, #depth-input').on('input', function() {
                const w = parseFloat($('#width-input').val()) || 0;
                const d = parseFloat($('#depth-input').val()) || 0;
                const area = w * d;
                // Clamp area to non-negative numbers
                $('#area-result').text(Math.max(0, area).toFixed(1) + " m²"); 
            });
    
            // Initial setup
            updateStep();

            // Product Filtering Logic
            const $filterSidebar = $('#filter-sidebar');
    const $body = $('body');

    // فتح الفلاتر
    $('#open-filters').on('click', function() {
        $filterSidebar.removeClass('hidden').addClass('block');
        $body.css('overflow', 'hidden');
    });

    // إغلاق الفلاتر
    $('#close-filters').on('click', function() {
        $filterSidebar.addClass('hidden').removeClass('block');
        $body.css('overflow', 'auto');
    });

    // التعامل مع تغيير حجم الشاشة (Resize)
    $(window).on('resize', function() {
        // نستخدم window.innerWidth ليكون دقيقاً مع الـ Breakpoints الخاصة بـ CSS
        if (window.innerWidth >= 1024) {
            // في شاشات الديسك توب
            $body.css('overflow', 'auto');
            $filterSidebar.removeClass('hidden').addClass('block');
        } else {
            // في الموبايل
            // التحقق إذا كان العنصر لا يحتوي على كلاس fixed (حسب منطق الكود الأصلي)
            if (!$filterSidebar.hasClass('fixed')) {
                $filterSidebar.addClass('hidden');
            }
        }
    });

            const countSpan = $('#product-count');
            const priceRange = $('#price-range');
            const priceDisplay = $('#price-display');
            const productItems = $('.product-item'); // Select existing items from DOM

            // 1. Filtering Logic
            function filterProducts() {
                const maxPrice = parseInt(priceRange.val());
                
                // Get checked categories
                const checkedCats = [];
                $('.filter-cat:checked').each(function() {
                    checkedCats.push($(this).val());
                });

                let visibleCount = 0;

                productItems.each(function() {
                    const item = $(this);
                    const price = parseInt(item.data('price'));
                    const category = item.data('category');

                    // Check Price
                    const matchPrice = price <= maxPrice;
                    // Check Category (if any checked)
                    const matchCat = checkedCats.length === 0 || checkedCats.includes(category);
                    
                    if (matchPrice && matchCat) {
                        item.show(); // Show matched item
                        visibleCount++;
                    } else {
                        item.hide(); // Hide unmatched item
                    }
                });

                countSpan.text(visibleCount);
            }

            // 2. Event Listeners
            priceRange.on('input', function() {
                const val = $(this).val();
                priceDisplay.text('$' + val);
                filterProducts();
            });

            $('.filter-cat').on('change', filterProducts);

            $('#clear-filters').click(function() {
                $('.filter-cat').prop('checked', false);
                priceRange.val(8000);
                priceDisplay.text('$8000');
                filterProducts(); // Re-filter all
            });

            // Initial Count
            countSpan.text(productItems.length);
        });