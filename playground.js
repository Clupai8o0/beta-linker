const results = []
const a = [1,2,3]
const b = [4,5,6]
console.log(results)
results.push(...a, ...(b || []))
console.log(results)