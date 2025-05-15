document.addEventListener("DOMContentLoaded", () => {
  
    const menuMobile = document.querySelector(".menu-mobile")
    const menu = document.querySelector(".menu")

    if (menuMobile) {
        menuMobile.addEventListener("click", () => {
            menu.classList.toggle("active")
        })
    }

    const menuItems = document.querySelectorAll(".menu a")
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            menu.classList.remove("active")
        })
    })


    const tabButtons = document.querySelectorAll(".tab-btn")
    const menuItemsTabs = document.querySelectorAll(".menu-items")

    if (tabButtons.length > 0) {
        tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const category = this.dataset.category

            
            tabButtons.forEach((btn) => btn.classList.remove("active"))

            
            this.classList.add("active")

            
            menuItemsTabs.forEach((item) => {
            item.style.display = "none"
            })

            
            document.getElementById(category).style.display = "block"
        })
        })
    }


    const testimonialSlider = document.querySelector(".testimonial-slider")

    if (testimonialSlider) {
        let isDown = false
        let startX
        let scrollLeft

        testimonialSlider.addEventListener("mousedown", (e) => {
            isDown = true
            testimonialSlider.classList.add("active")
            startX = e.pageX - testimonialSlider.offsetLeft
            scrollLeft = testimonialSlider.scrollLeft
        })

        testimonialSlider.addEventListener("mouseleave", () => {
            isDown = false
            testimonialSlider.classList.remove("active")
        })

        testimonialSlider.addEventListener("mouseup", () => {
            isDown = false
            testimonialSlider.classList.remove("active")
        })

        testimonialSlider.addEventListener("mousemove", (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - testimonialSlider.offsetLeft
            const walk = (x - startX) * 2
            testimonialSlider.scrollLeft = scrollLeft - walk
        })

    
        let autoScroll

        function startAutoScroll() {
        autoScroll = setInterval(() => {
            testimonialSlider.scrollLeft += 1

            if (testimonialSlider.scrollLeft >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                testimonialSlider.scrollLeft = 0
            }
        }, 20)
        }

        function stopAutoScroll() {
        clearInterval(autoScroll)
        }

        if (window.innerWidth <= 768) {
            startAutoScroll()

            testimonialSlider.addEventListener("touchstart", stopAutoScroll)
            testimonialSlider.addEventListener("touchend", startAutoScroll)
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: "smooth",
                })
            }
        })
    })


    function animateOnScroll() {
        const elements = document.querySelectorAll(".card, .menu-card, .philosophy-item, .team-member, .contact-card")

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top
            const screenPosition = window.innerHeight / 1.3

            if (elementPosition < screenPosition) {
                element.classList.add("animate")
            }
        })
    }

    document.head.insertAdjacentHTML(
        "beforeend",
        `
            <style>
                .card, .menu-card, .philosophy-item, .team-member, .contact-card {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                
                .card.animate, .menu-card.animate, .philosophy-item.animate, .team-member.animate, .contact-card.animate {
                    opacity: 1;
                    transform: translateY(0);
                }
            </style>
        `,
    )

    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
})
