/**
 * 快速排序算法
 * @param  {[type]} array     要排序的数组; 可以是对象数组，但必须指定第三个参数;
 * @param  {[type]} sortType  排序类型： 'asc' 默认从小到大排序; 'desc' 从大到小排序;
 * @param  {[type]} objectKey 如果 array 参数是对象数组，需要根据指定字段进行排序，该字段必须是数值类型;
 * @return {[type]}           排序后的数组
 */
function quickSort(array, sortType, objectKey) {

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

  // 对象数组分区，左小右大
  function partitionArrObj(array, left, right) {
    var storeIndex = left;
    var pivot = array[right][objectKey]; // 直接选最右边的元素为基准元素
    for (var i = left; i < right; i++) {
      if (array[i][objectKey] < pivot) {
        swap(array, storeIndex, i);
        storeIndex++; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
      }
    }
    swap(array, right, storeIndex); // 将基准元素放置到最后的正确位置上
    return storeIndex;
  }

  // 对象数组分区，左大右小
  function partitionArrObj2(array, left, right) {
    var storeIndex = left;
    var pivot = array[right][objectKey]; // 直接选最右边的元素为基准元素
    for (var i = left; i < right; i++) {
      if (array[i][objectKey] > pivot) {
        swap(array, storeIndex, i);
        storeIndex++; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
      }
    }
    swap(array, right, storeIndex); // 将基准元素放置到最后的正确位置上
    return storeIndex;
  }

  // 对数组进行分区，对分区后的区域再次分区，递归执行，直到左边起始点索引大于右边起始点索引；
  function sort(array, left, right) {
    if (left > right) {
      return;
    }
    var storeIndex;
    // 如果是对象数组，需要指定用来排序的字段名称
    if (objectKey) {
      if (sortType === 'desc') {
        storeIndex = partitionArrObj2(array, left, right);
      } else {
        storeIndex = partitionArrObj(array, left, right);
      }
    } else {  // 数值数组
      if (sortType === 'desc') {
        storeIndex = partition2(array, left, right);
      } else {
        storeIndex = partition(array, left, right);
      }
    }
    sort(array, left, storeIndex - 1);
    sort(array, storeIndex + 1, right);
  }
  // 开始排序
  sort(array, 0, array.length - 1);
  // 返回结果
  return array;
}


/**
 * 使用示例
 */

var arr = [3, 51, 7, 15, 4, 9, 12, 33, 2, 9, 11];
console.log(quickSort(arr));  // 默认，从小到大排序
console.log(quickSort(arr, 'desc'));  // 从大到小排序

var arrObj = [
  { id: 1, nb: 3 },
  { id: 2, nb: 51 },
  { id: 3, nb: 7 },
  { id: 4, nb: 15 },
  { id: 5, nb: 4 },
  { id: 6, nb: 9 },
  { id: 7, nb: 12 }
];
console.log(quickSort(arrObj, 'asc', 'nb'));
console.log(quickSort(arrObj, 'desc', 'nb'));