function getMassCenter(arr: number[]): number[] {
  const sum: number[] = [0, 0];
  for (let i = 0; i < arr.length / 2; i++) {
    sum[0] += arr[i * 2];
    sum[1] += arr[i * 2 + 1];
  }
  return [sum[0] / 3, sum[1] / 3];
}

export default getMassCenter;
