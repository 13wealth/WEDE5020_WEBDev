
//-Calculate the child's age from date of birth entered
    const dobInput = document.getElementById('dob');                                                            //-Get references to the input fields
    const ageInput = document.getElementById('childAge');

    dobInput.addEventListener('change', function() 
    {
        const dob = new Date(this.value);
        if (dob instanceof Date && !isNaN(dob)) 
        {
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();
            
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))                                              //-Adjusts age if birthday hasn't occurred yet this year
            {
                age--;
            }

            ageInput.value = Math.min(Math.max(age, 1), 18);                                                    //-Limit age between 1 and 18
        } else {
            ageInput.value = '';
        }
    });
    
//-Rough.js (Count-up Animations)
    const counters = document.querySelectorAll('.counter');                                                     //-Handles count-up animations
    const speed = 500;                                                                                          //-Lower = Faster
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) 
                {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target === 100 ? '%' : '+');
                }
            };
            updateCount();
        });
    };

//-JS For Statistics Counters
    const section = document.getElementById('milestones');                                                      
    let started = false;
    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        if (!started && rect.top < window.innerHeight) 
        {
            animateCounters();
            started = true;
        }
    });    
    
//-Animation trigger for value card visibility     
    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".value-card");
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) 
                {
                    entry.target.classList.add("show");                                                         //-Trigger animation
                    observer.unobserve(entry.target);                                                           //-Animate once
                }
            });
        }, { threshold: 0.2 });                                                                                 //-Trigger when 20% visible

        cards.forEach(card => observer.observe(card));
    });
    
//-Animation trigger for heading slide visibility
    const elements = document.querySelectorAll('.slide-left, .slide-right');                                    //-Trigger animation when elements scroll into view
    function checkInView() 
    {
        const triggerBottom = window.innerHeight * 0.8;                                                         //-80% down viewport
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) 
            {
                el.classList.add('active');
            }
        });
    }
        window.addEventListener('scroll', checkInView);
        window.addEventListener('load', checkInView);

//-Animaion trigger for why us list     
    document.addEventListener("DOMContentLoaded", () => { 
        const section = document.querySelector(".why-us-list");
        const items = section.querySelectorAll("li");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) 
                    {
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add("animate");
                            }, index * 120);                                                                    //-Staggered animation
                        });
                    }
                });
            },
            {
                threshold: 1.0                                                                                  //-Requires 100% visibility
            }
        );

        observer.observe(section);
    });

//-Wraps the code to ensure it runs after the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function ()                                                   
    {
        document.getElementById("admissionForm").addEventListener("submit", function (e) 
        {
            e.preventDefault();                                                                                 //-Stops the form from submitting and refreshing
            alert("Thank you! Your message has been received.");                                                //-Notification when submit is clicked
        });
    });

//-Scroll up button 
    const scrollUpBtn = document.getElementById("scrollUpBtn");
    window.addEventListener('scroll', () => {                                                                   //-Show button after scrolling down 300px
    if (window.scrollY > 300) 
        {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }
    });

//-Universal navbar blur for all pages
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

//-Field Validations on all the forms that needs-validation
    (function () {
        'use strict';

        const forms = document.querySelectorAll('.needs-validation');                                           //-Selects all forms that need validation

        forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity()) 
                {
                    alert('Form submitted successfully!');
                    form.reset();

                    const modalEl = form.closest('.modal');                                                     //-If the form is inside a modal, close modal safely
                    if (modalEl) 
                    {
                        const modal = bootstrap.Modal.getInstance(modalEl);
                        modal?.hide();
                    }

                } else {
                    form.classList.add('was-validated');
                }
            });
        });
    })();

    //-Rough.js (Feature card)
    document.querySelectorAll('.feature-card').forEach(card =>                                                  //-Handles Rough.js hand-drawn border generator for the feature cards
    {                                                                                                           //-.forEach loops over each one to apply the hand-drawn effect individually
        const canvas = card.querySelector('canvas.rough-canvas');                                               //-Inside each card, we find <canvas> element with class .rough-canvas
        const rc = rough.canvas(canvas);                                                                        //-Creates a Rough.js canvas context on that <canvas> so we can draw sketchy shapes

        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;

        rc.rectangle(2, 2, canvas.width - 4, canvas.height - 4,                                                 //-Draws a wiggly rectangle around the card                           
        {
            stroke: '#fff200',                                                                                //-Yellow color for the border
            strokeWidth: 3,                                                                                     //-Border thickness
            roughness: 3,                                                                                       //-Sets the roughness of the border
            bowing: 2                                                                                           //-Sets the wobble or curve of the lines
        });
    });

    



