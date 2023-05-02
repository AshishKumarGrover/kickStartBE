const { SAMESCHEME } = require("../constants")

// function to calculate Correlation between two schemes

const findCorrelation = async (scheme1, scheme2) => {
    const count = scheme1.length

    let sumXY = 0
    let sumX = 0
    let sumY = 0
    let sumOfX2 = 0
    let sumOfY2 = 0
    let squareOfSumX = 0
    let squareOfSumY = 0

    for (let i = 0; i < count; i++) {
        sumXY += (scheme1[i]).nav * (scheme2[i].nav)
        sumX += scheme1[i].nav
        sumY += scheme2[i].nav
        sumOfX2 += Math.pow(scheme1[i].nav, 2)
        sumOfY2 += Math.pow(scheme2[i].nav, 2)
    }
    sumXY = sumXY.toFixed(2)
    sumX = sumX.toFixed(2)
    sumY = sumY.toFixed(2)
    sumOfX2 = sumOfX2.toFixed(2)
    sumOfY2 = sumOfY2.toFixed(2)
    squareOfSumX = (sumX * sumX)
    squareOfSumY = (sumY * sumY)

    const numerator = (((count) * (sumXY)) - ((sumX) * (sumY)))
    const denominator = Math.sqrt(((count * sumOfX2) - (squareOfSumX)) * ((count * sumOfY2) - (squareOfSumY)))

    const correlation = numerator / denominator
    return correlation
}



const filterObjectData = async (scheme1, scheme2) =>  {
    const updatedScheme1 = []
    const updatedScheme2 = []
    for (let i = 0; i < scheme1.length; i++) {
        const navDate = scheme1[i].navDate
        const matchingIndex = scheme2.findIndex(item => item.navDate == navDate)

        if (matchingIndex != -1) {
            updatedScheme1.push(scheme1[i])
            updatedScheme2.push(scheme2[matchingIndex])
        }
    }

    const correlationBtwTwoSchemes = await findCorrelation(updatedScheme1, updatedScheme2)
    return correlationBtwTwoSchemes
}


const calculateMatrix = async (navData) => {
    let obj = {}
    let correlationMatrix = []

    // loop to fetch all navs of schemes in array
    navData.forEach((element, index) => {
        if (obj[navData[index].schid]) {
            obj[navData[index].schid].push(navData[index])
        } else {
            obj[navData[index].schid] = [navData[index]]
        }
    })
    const objKeys = Object.keys(obj)
    // loop to fetch 
    for(let i=0; i<objKeys.length; i++){
        let arr=[]
        for(let j=0; j<objKeys.length; j++){
            const correlation = await filterObjectData(obj[objKeys[i]], obj[objKeys[j]])
            if(objKeys[i] === objKeys[j]){
                arr.push(SAMESCHEME)
            }else{
                arr.push(correlation.toFixed(2))
            }
        }
        correlationMatrix.push(arr)
    }
    return correlationMatrix
}
module.exports = { calculateMatrix }