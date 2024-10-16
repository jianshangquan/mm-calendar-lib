export class BinarySearch{
    public static search2D<T>(key: T, array: T[][]) : number {
        let i: number;
		let l: number = 0;
		let u: number = array.length - 1;
		while (u >= l) {
			i = Math.floor((l + u) / 2.0);
			if (array[i][0] > key) {
				u = i - 1;
			} else if (array[i][0] < key) {
				l = i + 1;
			} else {
				return i;
			}
		}
		return -1;
    }

    // public static search1D<T>(key: T, array: T[]) : number {
    //     let i: number;
	// 	let l: number = 0;
	// 	let u: number = array.length - 1;

	// 	while (u >= l) {
	// 		i = Math.floor((l + u) / 2.0);
	// 		if (array[i] > key) {
	// 			u = i - 1;
	// 		} else if (array[i] < key) {
	// 			l = i + 1;
	// 		} else {
	// 			return i;
	// 		}
	// 	}
	// 	return -1;
    // }
}