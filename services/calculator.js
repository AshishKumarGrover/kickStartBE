// function to calculate Correlation between two schemes
const findCorrelation = async (array1, array2) => {
    const count = array1.length

    var sumXY = 0
    var sumX = 0
    var sumY = 0
    var sumOfX2 = 0
    var sumOfY2 = 0
    var sqOfSumX = 0
    var sqOfSumY = 0

    for (let i = 0; i < count; i++) {
        sumXY += (array1[i]).nav * (array2[i].nav)
        sumX += array1[i].nav
        sumY += array2[i].nav
        sumOfX2 += Math.pow(array1[i].nav, 2)
        sumOfY2 += Math.pow(array2[i].nav, 2)
    }

    sqOfSumX = sumX * sumX
    sqOfSumY = sumY * sumY

    const numenator = (((count) * (sumXY)) - ((sumX) * (sumY)))
    const denominator = Math.sqrt(((count * sumOfX2) - (sqOfSumX)) * ((count * sumOfY2) - (sqOfSumY)))

    const correlation = numenator / denominator
    return correlation;
}



const filterObjectData = async (array1, array2) =>  {
    const updatedArray1 = []
    const updatedArray2 = []
    for (let i = 0; i < array1.length; i++) {
        const navDate = array1[i].navDate
        const matchingIndex = array2.findIndex(item => item.navDate == navDate)

        if (matchingIndex != -1) {
            updatedArray1.push(array1[i])
            updatedArray2.push(array2[matchingIndex])
        }
    }

    const correlationBtwTwoSchemes = await findCorrelation(updatedArray1, updatedArray2)
    return correlationBtwTwoSchemes
}


const calculator = async (navData) => {
    var obj = {}
    var correlationArr = []

    // loop to fetch all navs of schemes in array
    navData.forEach((element, index) => {
        if (obj[navData[index].schid]) {
            obj[navData[index].schid].push(navData[index])
        } else {
            obj[navData[index].schid] = [navData[index]]
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