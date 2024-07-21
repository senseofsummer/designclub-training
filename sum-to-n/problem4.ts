//O(n)
// Iterative Approach
function sum_to_n_a(n: number): number {
  let sum: number = 0;
  for (let i: number = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//O(1)
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

//O(n)
function sum_to_n_c(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n === 1) return 1;
  memo[n] = n + sum_to_n_c(n - 1, memo);
  return memo[n];
}