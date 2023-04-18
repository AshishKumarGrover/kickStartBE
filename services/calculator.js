// function to calculate Correlation between two schemes
const findCorrelation = async (arr1, arr2) => {
    const count = Math.min(arr1.length, arr2.length)

    var sumXY = 0
    var sumX = 0
    var sumY = 0
    var sumOfX2 = 0
    var sumOfY2 = 0
    var sqOfSumX = 0
    var sqOfSumY = 0

    for (let i = 0; i < count; i++) {
        sumXY += (arr1[i]).nav * (arr2[i].nav)
        sumX += arr1[i].nav
        sumY += arr2[i].nav
        sumOfX2 += Math.pow(arr1[i].nav, 2)
        sumOfY2 += Math.pow(arr2[i].nav, 2)
    }

    sqOfSumX = sumX * sumX
    sqOfSumY = sumY * sumY

    const numenator = (((count) * (sumXY)) - ((sumX) * (sumY)))
    const denominator = Math.sqrt(((count * sumOfX2) - (sqOfSumX)) * ((count * sumOfY2) - (sqOfSumY)))

    const coerr = numenator / denominator
    return coerr;
}



const filterObjectData = async (arr1, arr2) =>  {
    const updatedArr1 = []
    const updatedArr2 = []
    for (let i = 0; i < arr1.length; i++) {
        const navDate = arr1[i].navDate
        const matchingIndex = arr2.findIndex(item => item.navDate == navDate)

        if (matchingIndex != -1) {
            updatedArr1.push(arr1[i])
            updatedArr2.push(arr2[matchingIndex])
        }
    }

    const correlationBtwTwoSchemes = await findCorrelation(updatedArr1, updatedArr2)
    return correlationBtwTwoSchemes
}


const calculator = async (req) => {
    const navs = req
    var obj = {}
    var correlationArr = []

    // loop to fetch all navs of schemes in array
    navs.forEach((element, index) => {
        if (obj[navs[index].schid]) {
            obj[navs[index].schid].push(navs[index])
        } else {
            obj[navs[index].schid] = [navs[index]]
        }
    });


    const objKeys = Object.keys(obj)
    // loop to fetch 
    for(var i=0; i<objKeys.length; i++){
        var arr=[]
        for(var j=i; j<objKeys.length; j++){
            const correlation = await filterObjectData(obj[objKeys[i]], obj[objKeys[j]])
            if(objKeys[i] === objKeys[j]){
                arr.push(0)
            }else{
                arr.push(correlation)
            }
        }
        correlationArr.push(arr)
    }
    return correlationArr
}
module.exports = { calculator }