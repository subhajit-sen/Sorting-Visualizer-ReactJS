export const bubbleSort = (originalArray) => {
    const arr = [...originalArray];
    const animations = [];
    const n = arr.length;
    const sorted = [];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push({ arr: [...arr], active: [j, j + 1], sorted: [...sorted] });
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                animations.push({ arr: [...arr], active: [j, j + 1], sorted: [...sorted] });
            }
        }
        sorted.push(n - i - 1);
    }
    sorted.push(0);
    animations.push({ arr: [...arr], active: [], sorted: [...sorted] });
    return animations;
};

export const selectionSort = (originalArray) => {
    const arr = [...originalArray];
    const animations = [];
    const n = arr.length;
    const sorted = [];
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            animations.push({ arr: [...arr], active: [minIdx, j], sorted: [...sorted] });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                animations.push({ arr: [...arr], active: [minIdx, j], sorted: [...sorted] });
            }
        }
        if (minIdx !== i) {
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            animations.push({ arr: [...arr], active: [i, minIdx], sorted: [...sorted] });
        }
        sorted.push(i);
        animations.push({ arr: [...arr], active: [], sorted: [...sorted] });
    }
    sorted.push(n - 1);
    animations.push({ arr: [...arr], active: [], sorted: [...sorted] });
    return animations;
};

export const insertionSort = (originalArray) => {
    const arr = [...originalArray];
    const animations = [];
    const n = arr.length;
    const sorted = [0];
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        animations.push({ arr: [...arr], active: [i], sorted: [...sorted] });
        while (j >= 0 && arr[j] > key) {
            animations.push({ arr: [...arr], active: [j, j + 1], sorted: [...sorted] });
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        sorted.push(i);
        animations.push({ arr: [...arr], active: [j + 1], sorted: [...sorted] });
    }
    animations.push({ arr: [...arr], active: [], sorted: [...sorted] });
    return animations;
};

export const mergeSort = (originalArray) => {
    const arr = [...originalArray];
    const animations = [];

    const merge = (low, mid, high) => {
        let left = arr.slice(low, mid + 1);
        let right = arr.slice(mid + 1, high + 1);
        let i = 0, j = 0, k = low;
        while (i < left.length && j < right.length) {
            animations.push({ arr: [...arr], active: [low + i, mid + 1 + j] });
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            animations.push({ arr: [...arr], active: [k] });
            k++;
        }
        while (i < left.length) {
            animations.push({ arr: [...arr], active: [low + i] });
            arr[k] = left[i];
            animations.push({ arr: [...arr], active: [k] });
            i++;
            k++;
        }
        while (j < right.length) {
            animations.push({ arr: [...arr], active: [mid + 1 + j] });
            arr[k] = right[j];
            animations.push({ arr: [...arr], active: [k] });
            j++;
            k++;
        }
    };

    const mergeSortHelper = (low, high) => {
        if (low >= high) return;
        const mid = Math.floor((low + high) / 2);
        mergeSortHelper(low, mid);
        mergeSortHelper(mid + 1, high);
        merge(low, mid, high);
    };

    mergeSortHelper(0, arr.length - 1);
    animations.push({ arr: [...arr], active: [] });
    return animations;
};

export const quickSort = (originalArray) => {
    const arr = [...originalArray];
    const animations = [];
    const sorted = [];

    const partition = (low, high) => {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            animations.push({ arr: [...arr], active: [j, high], sorted: [...sorted] });
            if (arr[j] < pivot) {
                i++;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                animations.push({ arr: [...arr], active: [i, j], sorted: [...sorted] });
            }
        }
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        animations.push({ arr: [...arr], active: [i + 1, high], sorted: [...sorted] });
        return i + 1;
    };

    const quickSortHelper = (low, high) => {
        if (low < high) {
            const pi = partition(low, high);
            sorted.push(pi);
            animations.push({ arr: [...arr], active: [], sorted: [...sorted] });
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        } else if (low === high) {
            sorted.push(low);
        }
    };

    quickSortHelper(0, arr.length - 1);
    animations.push({ arr: [...arr], active: [], sorted: [...sorted] });
    return animations;
};
