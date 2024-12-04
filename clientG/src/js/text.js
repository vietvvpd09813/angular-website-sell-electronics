function hello(){
  let currentIndex1 = 0;
  const slides = document.querySelectorAll('.slider img');

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.style.opacity = i === index ? '1' : '0';
      });
  }

  function nextSlide() {
      currentIndex1 = (currentIndex1 + 1) % slides.length;
      showSlide(currentIndex1);
  }

  function prevSlide() {
      currentIndex1 = (currentIndex1 - 1 + slides.length) % slides.length;
      showSlide(currentIndex1);
  }

  setInterval(nextSlide, 3000); // Chuyển ảnh mỗi 3 giây
};

function slider2(){
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  let currentIndex = 0;
  let autoSlideInterval;

  // Nhân bản các mục sản phẩm để tạo hiệu ứng xoay vòng
  function cloneItems() {
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);
  }

  function updateCarousel() {
    const offset = -currentIndex * (100 / (totalItems + -1.5)); // Tính toán độ dịch chuyển
    track.style.transform = `translateX(${offset}%)`;
  }

  function showNext() {
    currentIndex++;
    // Nếu đã đến sản phẩm cuối cùng, đặt lại chỉ số về 0
    if (currentIndex >= totalItems + -1.5) {
      currentIndex = 1; // Bỏ qua sản phẩm đầu tiên (clone)
      track.style.transition = 'none'; // Bỏ hiệu ứng chuyển tiếp
      track.style.transform = `translateX(-100%)`; // Đặt lại vị trí
    } else {
      track.style.transition = 'transform 0.5s ease'; // Thiết lập lại hiệu ứng
    }
    updateCarousel();
  }

  function startAutoSlide() {
    cloneItems(); // Nhân bản các sản phẩm
    autoSlideInterval = setInterval(showNext, 3000); // Thay đổi sản phẩm mỗi 3 giây
  }

  startAutoSlide();
}
function btnlist(){
  let dropdownToggle = document.getElementById('dropdownToggle');
  let dropdownMenu = document.getElementById('dropdownMenu');

  function handleClick() {
      if (dropdownMenu.classList.contains('hidden')) {
          dropdownMenu.classList.remove('hidden');
          dropdownMenu.classList.add('block');
      } else {
          dropdownMenu.classList.add('hidden');
          dropdownMenu.classList.remove('block');
      }
  }

  dropdownToggle.addEventListener('click', handleClick);
}

function text (){
  const setup = () => {
    const getTheme = () => {
      if (window.localStorage.getItem('dark')) {
        return JSON.parse(window.localStorage.getItem('dark'))
      }
      return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const setTheme = (value) => {
      window.localStorage.setItem('dark', value)
    }

    return {
      loading: true,
      isDark: getTheme(),
      toggleTheme() {
        this.isDark = !this.isDark
        setTheme(this.isDark)
      },
    }
  }
}

function addcategory() {

  document.getElementById('addCategoryBtn').addEventListener('click', function() {
      document.getElementById('addCategoryForm').classList.remove('hidden');
      document.getElementById('overlay').classList.remove('hidden');
      document.getElementById('formContainer').classList.add('scale-100');
  });

  document.getElementById('cancelBtn').addEventListener('click', function() {
      document.getElementById('addCategoryForm').classList.add('hidden');
      document.getElementById('overlay').classList.add('hidden');
  });

  // Thêm sự kiện cho nút sửa
  const editButtons = document.querySelectorAll('button[data-action="edit"]');
  editButtons.forEach(button => {
      button.addEventListener('click', function() {
          document.getElementById('editCategoryForm').classList.remove('hidden');
          document.getElementById('overlay').classList.remove('hidden');
          document.getElementById('editFormContainer').classList.add('scale-100');
      });
  });

  document.getElementById('editCancelBtn').addEventListener('click', function() {
      document.getElementById('editCategoryForm').classList.add('hidden');
      document.getElementById('overlay').classList.add('hidden');
  });

}

function addproduct(){
    // JavaScript để hiển thị/ẩn form
    document.getElementById('addProductBtn').addEventListener('click', function() {
      document.getElementById('addProductForm').classList.remove('hidden');
      document.getElementById('overlay').classList.remove('hidden');
      document.getElementById('formContainer').classList.add('scale-100');
  });

  document.getElementById('cancelBtn').addEventListener('click', function() {
      document.getElementById('addProductForm').classList.add('hidden');
      document.getElementById('overlay').classList.add('hidden');
  });
}
function edituser(){
   // Hiển thị form chỉnh sửa trạng thái
   document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById('editUserForm').style.display = 'flex'; // Hiển thị form
        document.getElementById('overlay').style.display = 'block'; // Hiển thị lớp phủ
        const container = document.getElementById('editFormContainer');
        container.classList.remove('scale-0', 'opacity-0'); // Đảm bảo form không có lớp ẩn
        container.classList.add('scale-100', 'opacity-100'); // Thêm lớp hiển thị
    });
});

// Hủy hiển thị form
document.getElementById('cancelEditBtn').addEventListener('click', function() {
    document.getElementById('editUserForm').style.display = 'none'; // Ẩn form
    document.getElementById('overlay').style.display = 'none'; // Ẩn lớp phủ
    const container = document.getElementById('editFormContainer');
    container.classList.remove('scale-100', 'opacity-100'); // Loại bỏ lớp hiển thị
    container.classList.add('scale-0', 'opacity-0'); // Thêm lớp ẩn
});

// Thêm logic cho lớp phủ
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('editUserForm').style.display = 'none'; // Ẩn form
    document.getElementById('overlay').style.display = 'none'; // Ẩn lớp phủ
});

}

// Hàm xử lý tất cả các bước khi nhấn nút "Xem chi tiết"
function addorder() {

  document.querySelector('.none').addEventListener('click', function() {

    document.getElementById('orderDetailsModal').style.display = 'none';
  });

const block1Elements = document.querySelectorAll('.block1');

// Duyệt qua tất cả các phần tử và gán sự kiện click cho từng phần tử
block1Elements.forEach(function(element) {
  element.addEventListener('click', function() {
    // Lấy phần tử với id 'orderDetailsModal' và ẩn nó đi
    document.getElementById('orderDetailsModal').style.display = 'flex';
  });
});




}


function loginaaa(){
  const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

let submidt = document.getElementById('socialtext');
let returnt = document.getElementById('returnt');
let ppass = document.getElementById('ppass');


submidt.addEventListener("click", () => {
    ppass.classList.add("lissi");
});
returnt.addEventListener("click", () => {
    ppass.classList.remove("lissi");
});
}




function end22(){

  // Định nghĩa hàm thay đổi ảnh lớn khi hover vào ảnh nhỏ
function changeLargeImageOnHover() {
  const smallImages = document.querySelectorAll('.small-image');
  const largeImage = document.getElementById('largeImage');

  smallImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      const newSrc = img.getAttribute('src');
      largeImage.setAttribute('src', newSrc);
    });
  });
}

// Hàm để gọi lại changeLargeImageOnHover bất kỳ khi nào cần
function end22() {
  // Gọi hàm khi DOM đã được tải đầy đủ hoặc khi cần gọi lại
  changeLargeImageOnHover();
}

// Gọi hàm ngay khi trang tải xong, nếu bạn muốn chỉ thực hiện một lần
document.addEventListener('DOMContentLoaded', end22);

// Bạn có thể gọi lại `end22()` trong các tình huống khác nếu cần



}
