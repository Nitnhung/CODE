document.addEventListener('DOMContentLoaded', function() {

    // --- HIỆU ỨNG XUẤT HIỆN KHI CUỘN (SCROLL-FADE-IN) ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- XỬ LÝ THANH TÌM KIẾM HEADER ---
    const headerSearchForm = document.getElementById('header-search-form');
    if (headerSearchForm) {
        headerSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('header-search-input').value;
            if (searchTerm.trim() !== '') {
                alert(`Mô phỏng chức năng tìm kiếm cho: "${searchTerm}"`);
            } else {
                alert('Vui lòng nhập nội dung bạn muốn tìm.');
            }
        });
    }

    // --- LOGIC POP-UP CHI TIẾT (CHUNG) ---
    const detailModal = document.getElementById('value-detail-modal');
    const modalIcon = document.getElementById('modal-value-icon');
    const modalTitle = document.getElementById('modal-value-title');
    const modalDescription = document.getElementById('modal-value-description');

    const journeyDetails = {
        summer: {
            icon: '<img src="images/icon-sun.png" alt="Icon Mặt trời">',
            title: 'Chi Tiết: Mùa Hè Nỗ Lực',
            description: 'Đây là giai đoạn nước rút, nơi mỗi sĩ tử dồn toàn bộ tâm huyết và sức lực vào việc ôn luyện kiến thức. Những đêm thức trắng, những trang sách dày đặc ghi chú không chỉ là minh chứng cho sự chăm chỉ mà còn là quá trình rèn luyện ý chí sắt đá, khả năng chịu áp lực và tinh thần không bao giờ bỏ cuộc. Chính những nỗ lực không mệt mỏi này sẽ tạo nên nền tảng vững chắc cho mọi thành công trong tương lai.'
        },
        tradition: {
            icon: '<img src="images/icon-seedling.png" alt="Icon Mầm cây">',
            title: 'Chi Tiết: Gieo Mầm Cổ Truyền',
            description: 'Bên cạnh kiến thức sách vở, BTEC luôn coi trọng việc "gieo mầm" những giá trị đạo đức truyền thống. Tinh thần hiếu học, lòng biết ơn thầy cô, sự tôn trọng gia đình và tình yêu quê hương đất nước là những hành trang không thể thiếu. Chúng tôi tin rằng một chuyên gia giỏi phải là một người có nhân cách tốt. Những giá trị này sẽ là kim chỉ nam giúp sinh viên hành xử đúng đắn và có trách nhiệm với cộng đồng.'
        },
        future: {
            icon: '<img src="images/icon-rocket.png" alt="Icon Tên lửa">',
            title: 'Chi Tiết: Cất Cánh Tương Lai',
            description: 'Sau mùa hè nỗ lực, cánh cửa tương lai rộng mở chào đón các sĩ tử. Với tấm bằng BTEC được công nhận quốc tế, bạn đã sẵn sàng "cất cánh" vào một hành trình mới đầy hứa hẹn. Đây là lúc để áp dụng kiến thức, khẳng định bản thân tại các doanh nghiệp lớn, hoặc thậm chí là tự tin du học chuyển tiếp tại các trường đại học hàng đầu thế giới. Tương lai đang nằm trong tay bạn.'
        }
    };
    
    const valueDetails = {
        identity: {
            icon: '🤝',
            title: 'Tôn Trọng Bản Sắc',
            description: 'Tại BTEC, chúng tôi tin rằng sức mạnh của tương lai bắt nguồn từ sự thấu hiểu quá khứ. Sinh viên được khuyến khích tìm hiểu, tự hào và phát huy những giá trị văn hóa cốt lõi của dân tộc. Tinh thần "tôn sư trọng đạo", lòng hiếu học và tình đoàn kết tương thân tương ái không chỉ được giảng dạy mà còn được lồng ghép trong mọi hoạt động, tạo nên một môi trường giáo dục nhân văn, nơi mỗi cá nhân phát triển hài hòa giữa tri thức hiện đại và bản sắc Việt Nam.'
        },
        creativity: {
            icon: '💡',
            title: 'Tư Duy Sáng Tạo',
            description: 'Thế giới luôn thay đổi và sự sáng tạo là chìa khóa để thích ứng và dẫn đầu. BTEC phá vỡ lối học thụ động, thay thế bằng phương pháp học tập qua dự án (Project-based Learning). Sinh viên được trao cơ hội để giải quyết các vấn đề thực tế, được phép thử và sai, từ đó khơi dậy tiềm năng sáng tạo, rèn luyện tư duy phản biện và kỹ năng giải quyết vấn đề phức tạp. Mỗi giờ học là một hành trình khám phá, biến ý tưởng thành sản phẩm thực tiễn.'
        },
        global: {
            icon: '🌍',
            title: 'Hội Nhập Toàn Cầu',
            description: 'Với chương trình đào tạo chuẩn Anh Quốc và bằng cấp được công nhận quốc tế, sinh viên BTEC được trang bị đầy đủ hành trang để trở thành những công dân toàn cầu. Chúng tôi tập trung vào việc nâng cao trình độ tiếng Anh, rèn luyện kỹ năng làm việc nhóm, giao tiếp đa văn hóa và thích ứng với môi trường làm việc quốc tế. Tốt nghiệp BTEC, bạn không chỉ có trong tay kiến thức chuyên môn vững chắc mà còn cả sự tự tin để nắm bắt mọi cơ hội, dù ở Việt Nam hay bất cứ đâu trên thế giới.'
        }
    };

    const majorDetails = {
        it: {
            icon: '<img src="images/icon-laptop.png" alt="Icon Lập trình">',
            title: 'Chi Tiết: Lập Trình Máy Tính',
            description: 'Chuyên ngành Lập trình máy tính tại BTEC đào tạo sinh viên trở thành các kỹ sư phần mềm toàn diện. Chương trình tập trung vào các công nghệ cốt lõi như phát triển web front-end (HTML, CSS, JavaScript, React), back-end (Node.js, Databases), phát triển ứng dụng di động cho cả iOS và Android, và các kiến thức nền tảng về trí tuệ nhân tạo (AI) và học máy (Machine Learning), giúp sinh viên sẵn sàng đối mặt với mọi thử thách công nghệ.'
        },
        design: {
            icon: '<img src="images/icon-design.png" alt="Icon Thiết kế">',
            title: 'Chi Tiết: Thiết Kế Đồ Họa',
            description: 'Chuyên ngành Thiết kế đồ họa khơi dậy và nuôi dưỡng tài năng sáng tạo. Sinh viên sẽ được học từ các nguyên tắc thiết kế cơ bản đến việc sử dụng thành thạo các phần mềm chuyên nghiệp (Adobe Photoshop, Illustrator, InDesign). Chương trình đào tạo sâu về thiết kế nhận diện thương hiệu, UI/UX cho web và app, cũng như thiết kế các ấn phẩm quảng cáo, truyền thông đa phương tiện.'
        },
        business: {
            icon: '<img src="images/icon-business.png" alt="Icon Kinh doanh">',
            title: 'Chi Tiết: Quản Trị Kinh Doanh',
            description: 'Chuyên ngành Quản trị kinh doanh trang bị cho sinh viên kiến thức tổng quan và kỹ năng chuyên sâu để điều hành và phát triển doanh nghiệp. Các môn học bao gồm Marketing chiến lược, Quản trị tài chính, Quản lý nguồn nhân lực, Vận hành chuỗi cung ứng, và Khởi nghiệp. Sinh viên sẽ được tham gia các dự án kinh doanh mô phỏng để áp dụng lý thuyết vào thực tiễn.'
        },
        marketing: {
            icon: '<img src="images/icon-marketing.png" alt="Icon Marketing">',
            title: 'Chi Tiết: Marketing & Truyền Thông',
            description: 'Trong thời đại số, Marketing & Truyền thông là ngành không thể thiếu. Chuyên ngành này tập trung vào Digital Marketing, bao gồm SEO, SEM, Social Media Marketing, Content Marketing và phân tích dữ liệu. Sinh viên sẽ học cách xây dựng các chiến dịch quảng bá thương hiệu sáng tạo, đo lường hiệu quả và tối ưu hóa ngân sách để đạt được mục tiêu kinh doanh.'
        }
    };

    function openDetailModal(details) {
        if (details && detailModal) {
            if (details.icon.startsWith('<img')) {
                modalIcon.innerHTML = details.icon;
            } else {
                modalIcon.innerHTML = '';
                modalIcon.textContent = details.icon;
            }
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            detailModal.classList.add('active');
        }
    }

    document.querySelectorAll('.journey-modal-trigger').forEach(card => card.addEventListener('click', function() { openDetailModal(journeyDetails[this.dataset.journeyKey]); }));
    document.querySelectorAll('.value-modal-trigger').forEach(card => card.addEventListener('click', function() { openDetailModal(valueDetails[this.dataset.value]); }));
    document.querySelectorAll('.major-modal-trigger').forEach(card => card.addEventListener('click', function() { openDetailModal(majorDetails[this.dataset.majorKey]); }));

    // --- LOGIC CHUNG ĐỂ MỞ/ĐÓNG MODAL ---
    const allModals = document.querySelectorAll('.modal-overlay');
    allModals.forEach(modal => {
        const closeModalBtn = modal.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    const contactModal = document.getElementById('contact-modal');
    const openContactModalButtons = document.querySelectorAll('.open-modal-btn');
    openContactModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if(contactModal) contactModal.classList.add('active');
        });
    });

    // --- XỬ LÝ FORM ĐĂNG KÝ TƯ VẤN ---
    const popupForm = document.getElementById('popup-contact-form');
    const popupFormMessage = document.getElementById('popup-form-message');

    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('popup-name').value;
            const phone = document.getElementById('popup-phone').value;
            const email = document.getElementById('popup-email').value;
            if (name.trim() === '' || phone.trim() === '' || email.trim() === '') {
                popupFormMessage.textContent = 'Vui lòng điền đầy đủ thông tin.';
                popupFormMessage.style.color = '#ffc107';
                return;
            }
            popupFormMessage.textContent = `Cảm ơn ${name}! Chúng tôi sẽ liên hệ với bạn sớm nhất.`;
            popupFormMessage.style.color = '#fff';
            popupForm.reset();
            setTimeout(() => {
                if(contactModal) contactModal.classList.remove('active');
                setTimeout(() => {
                    popupFormMessage.textContent = '';
                }, 500);
            }, 3000);
        });
    }

    // --- LOGIC CHO SLIDER SINH VIÊN ---
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        const slides = Array.from(sliderTrack.children);
        const dotsNav = document.querySelector('.slider-dots');
        
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.children);

        const moveToSlide = (currentDot, targetDot) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const targetIndex = dots.indexOf(targetDot);
            const amountToMove = targetIndex * (slideWidth + 20); // +20 margin
            sliderTrack.style.transform = `translateX(-${amountToMove}px)`;
            
            currentDot.classList.remove('active');
            targetDot.classList.add('active');
        }

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button.slider-dot');
            if (!targetDot) return;
            const currentDot = dotsNav.querySelector('.active');
            if (targetDot !== currentDot) moveToSlide(currentDot, targetDot);
        });

        window.addEventListener('resize', () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const activeDot = dotsNav.querySelector('.active');
            const activeIndex = dots.indexOf(activeDot);
            const amountToMove = activeIndex * (slideWidth + 20);
            sliderTrack.style.transform = `translateX(-${amountToMove}px)`;
        });
    }

    // --- LOGIC CHO POP-UP CHI TIẾT SỰ KIỆN ---
    const eventDetailModal = document.getElementById('event-detail-modal');
    const openEventDetailBtn = document.getElementById('open-event-detail-btn');
    
    if (openEventDetailBtn && eventDetailModal) {
        const eventDetails = {
            techfest: {
                image: 'images/event-techfest.jpg',
                title: 'Chi Tiết Sự Kiện: BTEC TechFest 2024',
                info: `
                    <p><strong>🕒 Thời gian:</strong> 08:00, Ngày 25 tháng 12 năm 2024</p>
                    <p><strong>📍 Địa điểm:</strong> Hội trường lớn, BTEC FPT Hà Nội</p>
                    <p><strong>👤 Đối tượng:</strong> Toàn thể sinh viên BTEC</p>
                `,
                description: 'BTEC TechFest là ngày hội công nghệ thường niên và lớn nhất, nơi các tài năng trẻ BTEC có cơ hội trình làng những dự án, sản phẩm công nghệ, thiết kế sáng tạo mà mình đã ấp ủ. Sự kiện không chỉ là một cuộc thi, mà còn là nơi giao lưu, học hỏi từ các chuyên gia hàng đầu trong ngành và các doanh nghiệp lớn. Các hoạt động chính bao gồm: Triển lãm dự án, Talkshow với chuyên gia, Vòng thi thuyết trình chung kết và Gian hàng tuyển dụng từ các đối tác doanh nghiệp. Đây là cơ hội vàng để bạn thể hiện bản thân, kết nối và tìm kiếm cơ hội sự nghiệp ngay từ khi còn trên ghế nhà trường.'
            }
        };

        const modalEventImage = document.getElementById('modal-event-image');
        const modalEventTitle = document.getElementById('modal-event-title');
        const modalEventInfo = document.getElementById('modal-event-info');
        const modalEventDescription = document.getElementById('modal-event-description');

        openEventDetailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const details = eventDetails.techfest;
            modalEventImage.src = details.image;
            modalEventTitle.textContent = details.title;
            modalEventInfo.innerHTML = details.info;
            modalEventDescription.textContent = details.description;
            eventDetailModal.classList.add('active');
        });
    }
});