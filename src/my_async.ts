// 模拟axios
function _axios (num): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(++num)
    })
  })
}

function myAsync (generatorFn) {
  function asyncFun (...params: any[]) {
    const args = Array.prototype.slice.call(arguments, 0)
    const iterator = generatorFn.apply(this, args)
    function autoRun (data) {
      const result = iterator.next(data)
      if (result.done){
        return result.value
      } else {
        result.value.then(value => {
          autoRun(value)
        })
      }
    }
    autoRun.apply(this, args)
  }
  return asyncFun
}

// Generator 函数
function * G (n: number) {
  const res1 = yield _axios(n)
  console.log(res1) // 2
  const res2 = yield _axios(res1)
  console.log(res2) // 3
}

myAsync(G)(1)

async function _G (n: number) {
  const res1 = await _axios(n)
  console.log(res1) // 2
  const res2 = await _axios(res1)
  console.log(res2) // 3
}

_G(1)