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

    {"title": "Career Talk", "img": "/Assets/images/trace2024_1.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_2.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_3.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_4.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_5.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_6.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_7.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_8.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_9.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_10.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_11.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_12.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_13.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_14.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_15.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_16.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_17.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_18.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_19.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_20.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_21.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_22.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_23.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_24.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_25.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_26.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_27.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_28.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_29.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_30.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_31.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_32.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_33.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_34.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_35.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_36.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_37.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_38.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_39.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_40.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_41.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_42.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_43.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_44.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_45.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_41.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_42.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_43.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_44.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_45.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_46.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_47.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_48.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_49.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_50.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_51.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_52.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_53.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_54.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_55.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_56.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_57.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_58.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_59.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_60.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_61.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_62.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_63.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_64.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_65.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_66.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_67.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_68.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_69.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_70.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_71.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_72.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_73.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_74.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_75.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_76.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_77.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_78.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_79.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_80.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_81.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_82.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_83.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_84.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_85.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_86.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_87.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_88.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_89.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_90.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_91.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_92.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_93.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_94.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_95.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_96.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_97.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_98.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_99.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_100.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_101.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_102.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_103.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_104.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_105.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_106.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_107.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_108.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_109.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_110.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_111.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_112.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_113.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_114.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_115.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_116.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_117.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_118.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_1"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_119.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_120.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_121.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_122.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_123.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_124.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_125.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_126.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_127.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_128.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_129.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_130.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_131.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_132.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_133.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_134.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_135.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_136.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_137.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_138.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_139.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_140.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_141.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_142.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_143.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_144.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_145.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_146.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_147.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_148.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_149.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_150.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_151.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_152.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_153.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_154.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_155.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_156.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_157.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_158.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_159.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_160.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_161.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_162.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_163.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_164.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_165.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_166.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_167.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_168.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_169.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_170.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_171.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_172.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_173.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_174.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_175.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_176.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_177.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_178.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_179.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_180.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_181.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_182.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_183.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_184.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_185.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_186.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_187.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_188.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_189.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_190.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_191.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_192.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_193.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_194.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_195.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_196.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_197.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_198.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_199.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_200.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_201.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_202.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"},
    {"title": "Career Talk", "img": "/Assets/images/trace2024_203.jpg", "description": "TRACE 2024", "by": "Talent Recruitment and Career Exhibition", "category": "day_2"}

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
