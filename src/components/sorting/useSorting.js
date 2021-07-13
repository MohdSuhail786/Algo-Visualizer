import { useDispatch, useSelector } from "react-redux";
import { log as Log, programState } from "../../actions/index"

export default function useSorting() {
    const dispatch = useDispatch();
    const speed = useSelector(state=>state.speed)
    
    async function delay() {
        await new Promise((res) => setTimeout(res, speed));
    }
    let activeColor = "black",
    activeColorTwo = "goldenrod",
    sortedColor = "yellowgreen",
    defaultColor = "grey";

    function changeColor(r, index, color) {
        r.current[index].current.style.backgroundColor = color;
    }
    
    function swapTiles(r,A,B) {
        let currentA = r.current[A].current.style.transform.split("(")[1].split("px")[0]; 
        let currentB = r.current[B].current.style.transform.split("(")[1].split("px")[0]; 
        r.current[A].current.style.transform = `translateX(${parseInt(currentA)+40*(B-A)}px)`;
        r.current[B].current.style.transform = `translateX(${parseInt(currentB)-40*Math.abs(B-A)}px)`;
        let temp = r.current[A];
        r.current[A] = r.current[B];
        r.current[B] = temp;
    }
    
    function swap(arr,A,B) {
        let temp = arr[A];
        arr[A] = arr[B];
        arr[B] = temp;
    }

    
    
    async function bubbleSort(r, arr,callback) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                dispatch(programState(2))
                changeColor(r, j, activeColor);
                changeColor(r, j + 1, activeColorTwo);
                dispatch(Log(`comparing ${arr[j]} and ${arr[j+1]}`))
                await delay()
                dispatch(programState(4))
                await delay()
                if (arr[j] > arr[j + 1]) {
                    dispatch(programState(6))
                    dispatch(Log(`${arr[j]} > ${arr[j+1]} swapping...`))
                    swap(arr,j,j+1);
                    swapTiles(r,j,j+1)
                } 
                else {
                    dispatch(programState(2))
                    dispatch(Log(`${arr[j]} <= ${arr[j+1]} continue...`))
                }
                changeColor(r,j,defaultColor)
                changeColor(r,j+1,(j===arr.length-i-2)?sortedColor:defaultColor)
                await delay()
            }
            dispatch(programState(0))
            await delay()
        }  
        changeColor(r,0,sortedColor)
        dispatch(Log(`${arr} is the sorted array`))
        dispatch(programState(9))
        callback();
    }

    async function insertionSort(r,arr,callback) {
        for(let i = 1;i<arr.length;i++) {
            for(let j = i-1;j>=0;j--) {
                dispatch(programState(2))
                changeColor(r,j,activeColor);
                changeColor(r,j+1,activeColorTwo);
                await delay()
                dispatch(programState(4))
                await delay()
                dispatch(Log(`comparing ${arr[j+1]} and ${arr[j]}`))
                if (arr[j+1]<arr[j]) {
                    dispatch(programState(6))
                    dispatch(Log(`${arr[j+1]} < ${arr[j]} swapping...`))
                    swap(arr,j,j+1);
                    swapTiles(r,j,j+1);
                    changeColor(r,j,sortedColor);
                    changeColor(r,j+1,sortedColor);
                    await delay()
                }
                else {
                    dispatch(programState(8))
                    dispatch(Log(`${arr[j+1]} >= ${arr[j]} break...`))
                    changeColor(r,j,sortedColor);
                    changeColor(r,j+1,sortedColor);
                    await delay()
                    break;
                }
            }
            dispatch(programState(0))
            await delay()
        }
        dispatch(programState(10))
        dispatch(Log(`${arr} is the sorted array`))
        callback();
    }

    async function selectionSort(r,arr,callback) {
        for(let i = 0;i <arr.length-1;i++) {
            dispatch(programState(2))
            let min = i;
            dispatch(Log(`let min = ${arr[min]}`))
            await delay();
            for(let j = i+1; j<arr.length;j++) {
                dispatch(programState(3))
                changeColor(r,j,activeColorTwo)
                changeColor(r,min,activeColor)
                dispatch(Log(`compare ${arr[min]} and ${arr[j]}`))
                await delay()
                dispatch(programState(5));
                await delay()
                if(arr[j]<arr[min]) {
                    dispatch(programState(7));
                    dispatch(Log(`${arr[j]} < ${arr[min]}. So min = ${arr[j]}`))
                    changeColor(r,min,defaultColor)
                    min = j;
                    changeColor(r,min,activeColor)
                    await delay()
                }
                else {
                    dispatch(programState(3));
                    dispatch(Log(`${arr[j]} >= ${arr[min]}. Continue..`))
                    changeColor(r,j,defaultColor)
                    await delay()
                }
            }
            if (arr[min] === arr[i]) {
                changeColor(r,i,sortedColor)
                await delay();
                continue;
            }
            dispatch(programState(9));
            dispatch(Log(`Swap ${arr[i]} and ${arr[min]}`))
            swap(arr,i,min);
            swapTiles(r,i,min)
            await delay()
            changeColor(r,i,sortedColor)
            dispatch(programState(0));
            await delay()
        }
        dispatch(programState(11));
        changeColor(r,arr.length-1,sortedColor)
        callback();
    }

    function reset(r) {
        for(let i = 0;i<r.current.length;i++) {
            r.current[i].current.style.transform = "translateX(0px)";
            r.current[i].current.style.backgroundColor = defaultColor;
        }
        return true;
    }
    return {insertionSort, bubbleSort, selectionSort, reset};
}