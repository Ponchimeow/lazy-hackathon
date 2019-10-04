$(function () {
  const typed3 = new Typed('#typed', {
    strings: ['你知道嗎？<br>拖延...<br><br>可以拯救世界喔'],
    typeSpeed: 120,
    backSpeed: 50,
    loop: true,
    fadeOut: true,
  });

  $('.judge__gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.judge__nav'
  });

  $('.judge__nav').slick({
    centerMode: true,
    centerPadding: '20px',
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.judge__gallery',
    autoplay: true,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      }
    ]
  });

  window.addEventListener("hashchange", function (event) {
    event.preventDefault();
    const url = location.hash.substr(1);
    const target = document.querySelector(`.${url}`).offsetTop - 60;
    window.scrollTo({
      top: target,
      left: 0,
      behavior: 'smooth' // => 滑動效果
    });
    function heapSort(arr) {
      function heapify(arr, length, node) {
        const left = node * 2 + 1;
        const right = node * 2 + 2;

        // 先預設最大的節點是自己
        let max = node;

        if (left < length && arr[left] > arr[max]) {
          max = left;
        }

        if (right < length && arr[right] > arr[max]) {
          max = right;
        }

        // 如果左右兩邊有任何一個比 node 大的話
        if (max !== node) {
          // 就把兩個互換
          [arr[node], arr[max]] = [arr[max], arr[node]];

          // 接著繼續 heapfiy
          heapify(arr, length, max);
        }
      }

      // build max heap
      const length = arr.length;
      for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(arr, length, i);
      }

      // 排序
      for (let i = length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
      }
      return arr;
    }
  });


  /*
  nav 縮小
  from: https://benmarshall.me/attaching-javascript-handlers-to-scroll-events/
  */
  document.addEventListener('wheel', () => {
    if (window.scrollY > 50) {
      document.querySelector('.nav').classList.add('nav-scrolled')
    } else {
      document.querySelector('.nav').classList.remove('nav-scrolled')
    }
  }, { capture: false, passive: true })

  function run() {
    function quickSort(arr) {
      const swap = (array, i, j) => {
        [array[i], array[j]] = [array[j], array[i]];
      }
      const partition = (array, start, end) => {
        let splitIndex = start + 1;
        for (let i = start + 1; i <= end; i++) {
          if (array[i] < array[start]) {
            swap(array, i, splitIndex);
            splitIndex++;
          }
        }

        // 記得把 pivot 跟最後一個比它小的元素互換
        swap(array, start, splitIndex - 1);
        return splitIndex - 1;
      }
      const _quickSort = (array, start, end) => {
        if (start >= end) return array;

        // 在 partition 裡面調整數列，並且回傳 pivot 的 index
        const middle = partition(array, start, end);
        _quickSort(array, start, middle - 1);
        _quickSort(array, middle + 1, end);
        return array;
      };
      return _quickSort(arr, 0, arr.length - 1);
    }

  }
});

