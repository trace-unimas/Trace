var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true
});

// JavaScript to handle hover and click functionality
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth >= 992) {
        // Enable hover for desktop
        document.querySelectorAll('.nav-item.dropdown').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                let dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.add('show');
                }
            });
            el.addEventListener('mouseout', function () {
                let dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
            });
        });
    } else {
        // Enable click for mobile
        document.querySelectorAll('.nav-item.dropdown > a').forEach(function (el) {
            el.addEventListener('click', function (e) {
                let dropdownMenu = this.nextElementSibling;
                if (dropdownMenu) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('show');
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const images = [
        { src: 'Assets/images/trace2024_6.jpg', alt: 'Trace 2024', date: '2024-06-24', href: 'gallery-pages/trace2024-gallery.html' },
        { src: 'Assets/images/fscit_8.jpg', alt: 'Graduate Professional Programme', date: '2024-05-10', href: 'gallery-pages/gpp-gallery.html' },
        { src: 'Assets/images/440740562_888023369795978_1223897293292447630_n.jpg', alt: 'Trace Tour', date: '2024-04-01', href: 'gallery-pages/tracetour-gallery.html' },
        // Add more images with respective links
    ];


    const itemsPerPage = 10;
    let currentPage = 1;

    function displayImages(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const imagesToShow = images.slice(startIndex, endIndex);

        const galleryContainer = $('.gallery-container .row');
        galleryContainer.empty(); // Clear the container before adding new items

        imagesToShow.forEach(image => {
            galleryContainer.append(`
            <div class="col-md-6">
                <a href="${image.href}" class="gallery-item" style="background-image: url('${image.src}');" target="_blank">
                    <div class="text-overlay">${image.alt}</div>
                </a>
            </div>
        `);
        });
    }

    function setupPagination() {
        const pageCount = Math.ceil(images.length / itemsPerPage);
        const paginationContainer = $('.pagination');
        paginationContainer.empty(); // Clear existing pagination buttons

        for (let i = 1; i <= pageCount; i++) {
            paginationContainer.append(`<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`);
        }

        $('.page-link').on('click', function(e) {
            e.preventDefault();
            currentPage = parseInt($(this).text());
            displayImages(currentPage);
            $('.page-item').removeClass('active');
            $(this).parent().addClass('active');
        });
    }

    // Initial call
    displayImages(currentPage);
    setupPagination();

    // Existing code for navbar and modal functionality
    setupNavbarDropdowns();
    setupCounters();
    initializeModal();
});

// Existing functions updated to be callable
function setupNavbarDropdowns() {
    const navbarDropdowns = document.querySelectorAll('.navbar .dropdown');
    navbarDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', function() {
            this.classList.add('show');
            this.querySelector('.dropdown-menu').classList.add('show');
        });
        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('show');
            this.querySelector('.dropdown-menu').classList.remove('show');
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupCounters();

    // Other setups like pagination and modals
});

function setupCounters() {
    const counters = document.querySelectorAll('.key-figures-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const speed = 200; // The lower the speed, the faster the counter
        setupObserver(counter, target, speed);
    });
}

function setupObserver(element, target, speed) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                incrementCounter(element, target, speed);
                observer.unobserve(element); // Stop observing after the animation starts
            }
        });
    }, { threshold: 0.5 });

    observer.observe(element);
}

function incrementCounter(element, target, speed) {
    let current = 0;
    const step = target / speed;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = `${Math.ceil(current)}+`;
            setTimeout(updateCounter, 1);
        } else {
            element.textContent = `${target}+`;
        }
    };

    updateCounter();
}

// Observer for counter animation using IntersectionObserver
function observer(element, target, speed) {
    const updateCount = () => {
        const count = +element.innerText.replace(/\D/g,'');
        const inc = target / speed;

        if (count < target) {
            element.innerText = Math.ceil(count + inc) + '+';
            setTimeout(updateCount, 1);
        } else {
            element.innerText = target + '+';
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(element);
}

function initializeModal() {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const lens = document.getElementById("magnifier-lens");
    const links = document.getElementsByClassName("modal-link");
    const closeButton = document.getElementsByClassName("close")[0];

    Array.from(links).forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            openModal(this.href);
        });
    });

    closeButton.addEventListener("click", () => closeModal(modal));

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    modalImage.addEventListener('mousemove', throttle((e) => moveLens(e, modalImage, lens), 20));
    lens.addEventListener('mousemove', throttle((e) => moveLens(e, modalImage, lens), 20));

    function openModal(imageSrc) {
        modal.style.display = "block";
        modalImage.src = imageSrc;
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    function moveLens(e, modalImage, lens) {
        const rect = modalImage.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const posY = e.clientY - rect.top;
        const size = lens.offsetWidth / 2;
        const x = Math.max(0, Math.min(modalImage.offsetWidth - size, posX - size));
        const y = Math.max(0, Math.min(modalImage.offsetHeight - size, posY - size));

        lens.style.left = x + 'px';
        lens.style.top = y + 'px';
        lens.style.backgroundImage = `url('${modalImage.src}')`;
        lens.style.backgroundRepeat = 'no-repeat';
        lens.style.backgroundSize = `${modalImage.offsetWidth * 3}px ${modalImage.offsetHeight * 3}px`;
        lens.style.backgroundPosition = `-${x * 3}px -${y * 3}px`;
        lens.style.display = 'block';
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}


const d = document,
    $gallery = d.getElementById('gallery'),
    $template = d.getElementById('template-card').content,
    $fragment = d.createDocumentFragment()

class Photo {
    // static all = []
    constructor({id,title,img,description,by,category}){
        this.id = id,
            this.title = title,
            this.img = img,
            this.description = description,
            this.by = by,
            this.category = category
        // Photo.all.push(this)
    }
}

const MY_PHOTOS = [
    {title: 'Trace Tour', img: '/Assets/images/440740562_888023369795978_1223897293292447630_n.jpg',description: 'Trace Tour', by: 'Trace', category: 'Wings'},
    {title: 'Trace Tour', img: '/Assets/images/440946467_888023413129307_1800706479878257359_n.jpg', description: 'Trace Tour', by: 'Trace', category: 'Anime'},
    {title: 'Trace Tour', img: '/Assets/images/440934305_888023473129301_3894397668208119508_n.jpg', description: 'Trace Tour', by: 'Trace', category: 'Camping'},
    {title: 'Trace Tour', img: '/Assets/images/441520375_888023549795960_4167533163628946152_n.jpg', description: 'Trace Tour', by: 'Trace', category: 'Christmas'},


]

MY_PHOTOS.map((el,i) => el.id=i)

// Usando all
// New Photo('',''...)

// Photo.all.forEach(el=>
MY_PHOTOS.forEach(el=> {
    $template.querySelector('figure').dataset.id = el.id
    $template.querySelector('figure').dataset.category = el.category
    $template.querySelector('figure').dataset.description = el.description
    $template.querySelector('figure').dataset.by = `By ${el.by}`
    $template.querySelector('img').src = el.img
    $template.querySelector('img').alt = `${el.by} Photo`
    $template.querySelector('img').title = `${el.title} Photo`

    let $clone = d.importNode($template,true)
    $fragment.appendChild($clone)
})
$gallery.appendChild($fragment)

window.addEventListener('load', () => {
    $gallery.classList.add('uploaded')


    const $overlay = d.querySelector('.overlay'),
        images = [], by=[], description=[], title=[],
        $figureImg = d.querySelector('.gallery__open img'),
        $figcaption = d.querySelector('.gallery__open figcaption'),
        $leyend = d.querySelector('.overlay .leyend'),
        $fullscreen = d.querySelector('#gallery__fullscreen i')

    for(let index in MY_PHOTOS) {
        images.push(MY_PHOTOS[index].img)
        by.push(MY_PHOTOS[index].by)
        description.push(MY_PHOTOS[index].description)
        title.push(MY_PHOTOS[index].title)
    }

    for(let index in Photo.all) {
      images.push(Photo.all[index].img)
      by.push(Photo.all[index].by)
      description.push(Photo.all[index].description)
      title.push(Photo.all[index].title)
    }


    const lastImage = images.length -1

    d.addEventListener('click', e => {
        if(e.target.matches('.gallery__img')){
            const title = e.target.title,
                alt = e.target.alt,
                route = e.target.src,
                description = e.target.parentElement.dataset.description,
                by = e.target.parentElement.dataset.by
            $overlay.classList.remove('hidden')
            d.querySelector('.overlay img').title = title
            d.querySelector('.overlay img').alt = alt
            d.querySelector('.overlay img').src = route
            d.querySelector('.overlay .leyend').innerHTML = description
            d.querySelector('.overlay figcaption').innerHTML = by
            currentImage=e.target.parentElement.dataset.id
        }
        if(e.target.matches('#gallery__fullscreen, #gallery__fullscreen *')) {
            $fullscreen.classList.toggle('[ ]')
            $fullscreen.classList.toggle('fa-compress')
            d.fullscreenElement ? d.exitFullscreen() : $overlay.requestFullscreen()
        }
        if(e.target.matches('#gallery__close, #gallery__close *, #open')) {
            $overlay.classList.add('hidden')
            $fullscreen.classList.replace('fa-compress','fa-expand')
            d.fullscreenElement ? d.exitFullscreen() : ''
        }
        if(e.target.matches('#prev, #prev *')) {
            currentImage--
            currentImage < 0 ? currentImage = lastImage : ''
            $figureImg.src = images[currentImage]
            $figureImg.title = `${title[currentImage]} Photo`
            $figcaption.textContent = `By ${by[currentImage]}`
            $leyend.textContent = description[currentImage]
        }
        if(e.target.matches('#next, #next *')) {
            currentImage++
            currentImage > lastImage ? currentImage = 0 : ''
            $figureImg.src = images[currentImage]
            $figureImg.title = `${title[currentImage]} Photo`
            $figcaption.textContent = `By ${by[currentImage]}`
            $leyend.textContent = description[currentImage]
        }
    })
})



document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');

    document.querySelectorAll('.tentative-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            lightbox.style.display = 'block';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
