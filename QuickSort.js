var arr = [3, 51, 7, 15, 4, 9, 12, 33, 2, 9, 11]

function quickSort(array, sortType) {

  // 交换元素位置
  function swap(array, i, k) {
    var temp = array[i];
    array[i] = array[k];
    array[k] = temp;
  }

  // 数组分区，左小右大
  function partition(array, left, right) {
    var storeIndex = left;        
    var pivot = array[right]; // 直接选最右边的元素为基准元素
    for (var i = left; i < right; i++) {
      if (array[i] < pivot) {
        swap(array, storeIndex, i);
        storeIndex++; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
      }
    }
    swap(array, right, storeIndex); // 将基准元素放置到最后的正确位置上
    return storeIndex;
  }

  // 数组分区，左大右小
  function partition2(array, left, right) {
    var storeIndex = left;        
    var pivot = array[right]; // 直接选最右边的元素为基准元素
    for (var i = left; i < right; i++) {
      if (array[i] > pivot) {
        swap(array, storeIndex, i);
        storeIndex++; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
      }
    }
    swap(array, right, storeIndex); // 将基准元素放置到最后的正确位置上
    return storeIndex;
  }

  // 排序方法
  function sort(array, left, right) {
    if (left > right) {
      return;
    }
    var storeIndex;
    if (sortType === 'desc') {
      storeIndex = partition2(array, left, right);
    } else {
      storeIndex = partition(array, left, right);
    }
    sort(array, left, storeIndex - 1);
    sort(array, storeIndex + 1, right);
  }
  // 开始排序
  sort(array, 0, array.length - 1);
  // 返回结果
  return array;
}

console.log(quickSort(arr));  // 默认，从小到大排序
console.log(quickSort(arr, 'desc'));  // 从大到小排序