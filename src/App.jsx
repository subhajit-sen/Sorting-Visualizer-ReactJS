import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
} from './algorithms';

const MIN_VALUE = 10;
const MAX_VALUE = 400;
const ANIMATION_SPEED_MS = 25;

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [message, setMessage] = useState('');
  const stopRef = useRef(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = (size = arraySize) => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE));
    }
    setArray(newArray);
    setIsSorted(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setMessage('');
  };

  const handleArraySizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setArraySize(newSize);
    resetArray(newSize);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runSortingAlgorithm = async (algorithmFunction, name) => {
    if (isSorting) return;
    if (isSorted) {
      setMessage(`The array is already sorted! Generate a new array to try ${name}.`);
      return;
    }

    setIsSorting(true);
    stopRef.current = false;
    setMessage(`${name} is running...`);
    setActiveIndices([]);
    setSortedIndices([]);

    const animations = algorithmFunction(array);

    for (let i = 0; i < animations.length; i++) {
      if (stopRef.current) {
        setMessage(`${name} stopped.`);
        setIsSorting(false);
        return;
      }
      const { arr, active, sorted } = animations[i];
      setArray([...arr]);
      setActiveIndices(active || []);
      if (sorted) setSortedIndices(sorted);

      // Speed up Merge Sort and Quick Sort purely for UX 
      const speed = (name === "Merge Sort" || name === "Quick Sort")
        ? Math.max(2, ANIMATION_SPEED_MS / 2)
        : ANIMATION_SPEED_MS;

      await sleep(speed);
    }

    const finalSorted = array.map((_, i) => i);
    setSortedIndices(finalSorted);
    setActiveIndices([]);
    setIsSorting(false);
    setIsSorted(true);
    setMessage(`${name} completed!`);
  };

  return (
    <div className="visualizer-container">
      <header>
        <h1>Sorting Visualizer</h1>
        <div className="slider-wrapper">
          <label htmlFor="arraySizeSlider" className="slider-label">Array Size: {arraySize}</label>
          <div className="slider-controls-group">
            <button
              className="icon-btn"
              onClick={() => {
                let val = arraySize - 1;
                if (val < 10) val = 10;
                handleArraySizeChange({ target: { value: val } });
              }}
              disabled={isSorting || arraySize <= 10}
            >
              -1
            </button>
            <input
              type="range"
              id="arraySizeSlider"
              min="10"
              max="100"
              value={arraySize}
              onChange={handleArraySizeChange}
              disabled={isSorting}
              className="size-slider"
            />
            <button
              className="icon-btn"
              onClick={() => {
                let val = arraySize + 1;
                if (val > 100) val = 100;
                handleArraySizeChange({ target: { value: val } });
              }}
              disabled={isSorting || arraySize >= 100}
            >
              +1
            </button>
          </div>
        </div>
        <div className="controls">
          <button
            className="generate-btn"
            onClick={() => resetArray(arraySize)}
            disabled={isSorting}
          >
            Generate New Array
          </button>
          <button
            className="stop-btn"
            onClick={() => { stopRef.current = true; }}
            disabled={!isSorting}
          >
            Stop
          </button>
          <button
            onClick={() => runSortingAlgorithm(bubbleSort, 'Bubble Sort')}
            disabled={isSorting}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => runSortingAlgorithm(selectionSort, 'Selection Sort')}
            disabled={isSorting}
          >
            Selection Sort
          </button>
          <button
            onClick={() => runSortingAlgorithm(insertionSort, 'Insertion Sort')}
            disabled={isSorting}
          >
            Insertion Sort
          </button>
          <button
            onClick={() => runSortingAlgorithm(mergeSort, 'Merge Sort')}
            disabled={isSorting}
          >
            Merge Sort
          </button>
          <button
            onClick={() => runSortingAlgorithm(quickSort, 'Quick Sort')}
            disabled={isSorting}
          >
            Quick Sort
          </button>
        </div>
      </header>

      <div className="message-box">
        {message}
      </div>

      <div className="bars-container">
        {array.map((value, idx) => {
          let extraClass = '';
          if (activeIndices.includes(idx)) {
            extraClass = 'active';
          } else if (sortedIndices.includes(idx)) {
            extraClass = 'sorted';
          }

          return (
            <div
              className={`array-bar ${extraClass}`}
              key={idx}
              style={{ height: `${(value / MAX_VALUE) * 100}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
