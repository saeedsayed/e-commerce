"use client";
import React, {
  Dispatch,
  MutableRefObject,
  use,
  useEffect,
  useRef,
} from "react";
import styles from "./sliderRange.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const rangeToDefault = 800;
const SliderRange = () => {
  const range: number[] = [0, rangeToDefault];
  const [currentMinVal, setCurrentMinVal] = React.useState<number>(range[0]);
  const [currentMaxVal, setCurrentMaxVal] = React.useState<number>(range[1]);
  const progressBar = useRef() as MutableRefObject<HTMLDivElement>;
  const steps = range[1] / 20;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChangeMaxVal = (v: number) => {
    if (v <= currentMinVal + steps) {
      setCurrentMaxVal(currentMinVal + steps);
    } else if (v > range[1]) {
      setCurrentMaxVal(range[1]);
    } else {
      setCurrentMaxVal(v);
    }
  };
  const handleChangeMinVal = (v: number) => {
    if (v >= currentMaxVal - steps) {
      setCurrentMinVal(currentMaxVal - steps);
    } else if (v < range[0]) {
      setCurrentMinVal(range[0]);
    } else {
      setCurrentMinVal(v);
    }
  };

  const handleReset = () => {
    if (currentMinVal !== range[0] || currentMaxVal !== range[1]) {
      setCurrentMinVal(range[0]);
      setCurrentMaxVal(range[1]);
      const params = new URLSearchParams(searchParams);
      params.delete("minPrice");
      params.delete("maxPrice");
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const updateSearchParams = () => {
    // Create a new URLSearchParams object from the current searchParams
    const params = new URLSearchParams(searchParams);
    if (currentMinVal !== range[0] || currentMaxVal !== range[1]) {
      // Set or update a specific query parameter
      params.set("minPrice", currentMinVal.toString());
      params.set("maxPrice", currentMaxVal.toString());
    } else {
      // Remove the parameters if they are at default values
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    // Push the new URL with the updated parameters
    // Use `router.replace` instead of `router.push` to avoid adding to the browser history for simple filters
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    progressBar.current.style.right = `${
      100 - ((currentMaxVal + range[0]) / range[1]) * 100
    }%`;
    progressBar.current.style.left = `${
      ((currentMinVal - range[0]) / range[1]) * 100
    }%`;
  }, [currentMinVal, currentMaxVal]);

  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice) {
      setCurrentMinVal(+minPrice);
    }
    if (maxPrice) {
      setCurrentMaxVal(+maxPrice);
      // setCurrentMaxVal(Math.max(range[0], Math.min(range[1], +maxPrice)));
    }
  }, []);

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p>The highest price is: ${rangeToDefault}</p>
        <button
          className="text-red-600 border-b border-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="flex items-center gap-5 justify-between">
        <label htmlFor="" className="border py-2 ps-1">
          From: $
          <input
            type="number"
            min={range[0]}
            max={range[1]}
            step={steps}
            className="w-16 focus:outline-none"
            value={currentMinVal}
            onChange={(e) => handleChangeMinVal(+e.target.value)}
            onBlur={updateSearchParams}
          />
        </label>
        <label htmlFor="to" className="border py-2 ps-1">
          To: $
          <input
            type="number"
            min={range[0]}
            max={range[1]}
            step={steps}
            className="w-16 focus:outline-none"
            value={currentMaxVal}
            onChange={(e) => handleChangeMaxVal(+e.target.value)}
            onBlur={updateSearchParams}
          />
        </label>
      </div>

      <div className="relative h-2 select-none">
        <div
          ref={progressBar}
          className={`absolute z-10 h-full bg-badge left-0 right-full`}
        />
        <input
          type="range"
          min={range[0]}
          max={range[1]}
          step={steps}
          className={styles.minRangeInput}
          value={currentMinVal}
          onChange={(e) => handleChangeMinVal(+e.target.value)}
          onMouseUp={updateSearchParams}
        />
        <input
          type="range"
          min={range[0]}
          max={range[1]}
          step={steps}
          className={styles.maxRangeInput}
          value={currentMaxVal}
          onChange={(e) => handleChangeMaxVal(+e.target.value)}
          onMouseUp={updateSearchParams}
        />
      </div>
    </div>
  );
};

export default SliderRange;
