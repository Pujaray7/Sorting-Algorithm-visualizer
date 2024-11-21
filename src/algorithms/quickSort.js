import sleep from "./sleep";
import greenLayer from "./greenLayer";
import inputOn from "./inputOn";

async function quickSort(data, setData, speed, jump) {
    let buffer = [...data];
    const n = buffer.length;

    async function partition(low, high) {
        const pivot = buffer[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (buffer[j] < pivot) {
                i++;
                [buffer[i], buffer[j]] = [buffer[j], buffer[i]];
                await visualizeSwap(i, j);
            }
        }

        [buffer[i + 1], buffer[high]] = [buffer[high], buffer[i + 1]];
        await visualizeSwap(i + 1, high);

        return i + 1;
    }

    async function quickSortRecursive(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await quickSortRecursive(low, pi - 1);
            await quickSortRecursive(pi + 1, high);
        }
    }

    async function visualizeSwap(i, j) {
        const x = document.getElementById(i);
        const y = document.getElementById(j);

        x.style.backgroundColor = "red";
        y.style.backgroundColor = "red";

        const tempHeight = x.style.height;
        x.style.height = y.style.height;
        y.style.height = tempHeight;

        setData([...buffer]);
        await sleep(speed);

        x.style.backgroundColor = "";
        y.style.backgroundColor = "";
    }

    await quickSortRecursive(0, n - 1);
    await greenLayer(buffer, setData, speed);
    inputOn();
}

export default quickSort;
