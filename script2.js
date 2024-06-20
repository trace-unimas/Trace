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

    {title: 'Career Talk', img: '/Assets/images/fscit_1.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_2.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_3.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_4.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_5.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_6.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_7.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_8.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_9.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_10.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_11.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_12.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_13.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_14.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_15.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_16.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_17.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_18.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_19.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_20.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_21.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_22.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_23.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_24.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_25.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_26.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'},
    {title: 'Career Talk', img: '/Assets/images/fscit_27.jpg', description: 'Faculty of Computer Science and Information Technology', by: 'Graduate Professional Programme', category: 'FCSIT'}
];

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

    /*for(let index in Photo.all) {
      images.push(Photo.all[index].img)
      by.push(Photo.all[index].by)
      description.push(Photo.all[index].description)
      title.push(Photo.all[index].title)
    }
    */

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
            $fullscreen.classList.toggle('fa-expand')
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

document.querySelectorAll('input[name="categories"]').forEach(input => {
    input.addEventListener('change', (e) => {
        filterGallery(e.target.value);
    });
});

function filterGallery(category) {
    const $gallery = document.getElementById('gallery');
    $gallery.innerHTML = ''; // Clear the gallery

    const filteredPhotos = category === 'all' ? MY_PHOTOS : MY_PHOTOS.filter(photo => photo.category === category);

    filteredPhotos.forEach(el => {
        const $template = document.getElementById('template-card').content;
        const $fragment = document.createDocumentFragment();

        $template.querySelector('figure').dataset.id = el.id;
        $template.querySelector('figure').dataset.category = el.category;
        $template.querySelector('figure').dataset.description = el.description;
        $template.querySelector('figure').dataset.by = `By ${el.by}`;
        $template.querySelector('img').src = el.img;
        $template.querySelector('img').alt = `${el.by} Photo`;
        $template.querySelector('img').title = `${el.title} Photo`;

        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
        $gallery.appendChild($fragment);
    });
}
