
/**
 * DEEPTATTOO - STUDIO CONFIGURATION
 * Website: https://deeptattoo.vercel.app/
 * Address: 126/11 Nguyễn Duy Hiệu, An Hải, Đà Nẵng
 * Opening hours: 09:00 - 20:00, every day
 *
 * Cấu hình thông tin chính thức của DeepTattoo.
 */

const STUDIO_CONFIG = {
  name: "DeepTattoo",
  fullName: "DeepTattoo Tattoo Studio",
  tagline: "INK IS PERMANENT. MAKE IT MEAN SOMETHING.",

  // Logo chính thức
  logo: "/assets/images/logo.webp",

  // Thông tin liên hệ
  email: "tatuthang238@gmail.com",
  phone: "+84 36 584 0283",
  phoneDisplay: "+84 36 584 0283",

  // Địa chỉ chính thức
  address: {
    vi: "126/11 Nguyễn Duy Hiệu, An Hải, Đà Nẵng",
    en: "126/11 Nguyen Duy Hieu, An Hai, Da Nang, Vietnam"
  },

  // Giờ mở cửa
  hours: {
    vi: "Thứ 2 – Chủ nhật: 09:00 – 20:00",
    en: "Monday – Sunday: 09:00 – 20:00"
  },

  // Mạng xã hội chính thức
  social: {
    instagram: {
      url: "https://www.instagram.com/deeptattoo_studio",
      handle: "@deeptattoo_studio"
    },

    facebook: {
      url: "https://www.facebook.com/deeptattoo.studio121",
      handle: "DeepTattoo Tattoo Studio"
    },

    tiktok: {
      url: "#",
      handle: "@deeptattoo"
    },

    whatsapp: {
      url: "#",
      handle: "+84 36 584 0283"
    }
  },

  // Google Maps nhúng trên website
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1974301215914!2d108.23793257546598!3d16.055241484622233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177db59b5ddf%3A0x1a8e96bb900887c8!2zMTI2LzExIE5ndXnhu4VuIER1eSBIaeG7h3UsIEFuIEjhuqNpLCDEkMOgIE7hurVuZyA1MDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2sus!4v1790586792755!5m2!1sen!2sus",

  // Google Maps chính thức - nút chỉ đường
  mapsUrl: "https://maps.app.goo.gl/pQtrHeTg9fivFe4h8"
};


/**
 * ARTISTS DATA
 *
 * Nghệ sĩ có role: "ceo" sẽ hiển thị
 * riêng ở phần Founder trên trang chủ.
 */

const ARTISTS = [
  {
    id: "thang",
    role: "ceo",

    name: "Toan Thang",

    title: {
      vi: "Founder & Lead Artist",
      en: "Founder & Lead Artist"
    },

    specialty: {
      vi: "Fine Line & Minimal",
      en: "Fine Line & Minimal"
    },

    experience: {
      vi: "10+ năm kinh nghiệm",
      en: "10+ years of experience"
    },

    mission: {
      vi: "Xây dựng studio nơi mỗi hình xăm là một câu chuyện chân thật — an toàn, tinh tế và vượt thời gian.",
      en: "Building a studio where every tattoo is an honest story — safe, refined and timeless."
    },

    bio: {
      vi: "Thắng là Founder kiêm Lead Artist của DeepTattoo. Với hơn 10 năm trong nghề, anh kết hợp kỹ thuật fine line tinh xảo với tư duy thiết kế tối giản. Thang không chỉ xăm — anh đồng hành cùng khách từ ý tưởng đầu tiên đến chăm sóc sau cùng, đặt tiêu chuẩn vệ sinh và nghệ thuật lên hàng đầu.",

      en: "Thang is the Founder and Lead Artist of DeepTattoo. With over 10 years in the craft, he blends refined fine-line technique with minimalist design thinking. He guides each client from the first idea to aftercare, holding hygiene and artistry as non-negotiables."
    },

    instagram: "https://www.instagram.com/toanthang.tattoo",

    facebook: "https://www.facebook.com/thang.toan.3760430",

    portrait: "assets/images/artists/avt.webp",

    works: [
      "fine-line",
      "minimal",
      "lettering"
    ],

    // Tác phẩm nổi bật của Founder
    workImages: [
      "assets/images/studio/12.webp",
      "assets/images/studio/13.webp",
      "assets/images/studio/14.webp",
      "assets/images/studio/15.webp"
    ]
  }

  /*
  // Thêm nghệ sĩ mới tại đây nếu cần.

  ,{
    id: "khoa",
    role: "artist",
    name: "Khoa Tran",

    specialty: {
      vi: "Blackwork & Japanese",
      en: "Blackwork & Japanese"
    },

    bio: {
      vi: "Khoa chuyên về phong cách blackwork và Japanese tattoo.",
      en: "Khoa specializes in blackwork and Japanese tattoos."
    },

    instagram: "https://www.instagram.com/toanthang.tattoo",
    facebook: "https://www.facebook.com/thang.toan.3760430",

    portrait: "assets/images/artists/avt.jpg",

    works: [
      "blackwork",
      "japanese",
      "traditional"
    ],

    workImages: [
      "assets/images/studio/5.webp",
      "assets/images/studio/6.webp",
      "assets/images/studio/7.webp"
    ]
  }
  */
];


/**
 * WORK VIDEOS
 *
 * Video Facebook hiển thị ở trang chủ.
 * Giữ nguyên các đường dẫn video.
 */

const WORK_VIDEOS = [
  {
    title: "Video",
    href: "https://www.facebook.com/reel/1010980868147384"
  },
  {
    title: "Video",
    href: "https://www.facebook.com/reel/926320530234320"
  },
  {
    title: "Video",
    href: "https://www.facebook.com/reel/1419696479457720"
  },
  {
    title: "Video",
    href: "https://www.facebook.com/reel/1343142417869522"
  },
  {
    title: "Video",
    href: "https://www.facebook.com/reel/1092969673203695"
  }
];


/**
 * PORTFOLIO
 *
 * Dữ liệu hình xăm chính được quản lý tại:
 * js/portfolio-data.js
 */


/**
 * TATTOO STYLES
 *
 * Các phong cách xăm được sử dụng trên website.
 * Giữ nguyên cấu trúc dữ liệu và hình ảnh cũ.
 */

const STYLES = [
  {
    key: "fine-line",
    image: "590247813693-5541d1c609fd?w=600&h=400&fit=crop"
  },
  {
    key: "blackwork",
    image: "611501275019-9b5cda994e8d?w=600&h=400&fit=crop"
  },
  {
    key: "realism",
    image: "568515045052-f9a854d24744?w=600&h=400&fit=crop"
  },
  {
    key: "japanese",
    image: "611162617474-5b21e11e0111?w=600&h=400&fit=crop"
  },
  {
    key: "traditional",
    image: "611501275019-9b5cda994e8d?w=600&h=400&fit=crop"
  },
  {
    key: "minimal",
    image: "590247813693-5541d1c609fd?w=600&h=400&fit=crop"
  },
  {
    key: "lettering",
    image: "568515045052-f9a854d24744?w=600&h=400&fit=crop"
  },
  {
    key: "custom",
    image: "611162617474-5b21e11e0111?w=600&h=400&fit=crop"
  }
];
