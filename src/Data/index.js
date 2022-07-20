import data from './preodic.json'

export const COLOR_CATEGORY = {
    'nonmetal': '#FFFFC6', 'alkali metal': '#FEC8C8',
    'alkaline earth metal': '#FEC8C8', 'transition metal': '#BADCFF',
    'metalloid': '#E0EEB9', 'post-transition metal': '#B8FFB8',
    'noble gas': '#ffddb0', 'lanthanide': '#efac4a',
    'actinide': '#C2FFEB', 'halogen': '#ffea00',
    'diatomic nonmetal': '#FFFFC6', 'polyatomic nonmetal': '#FFFFC6',
}
const isF = (number) => {
    if (number >= 57 && number <= 71) {
        return [true, 0]
    } else if (number >= 89 && number <= 103) {
        return [true, 1]
    }
    return [false, -1]
}
const EmptyArr = (size, start = 0) => new Array(size).fill(null).map((item, index) => index + start)

const getFblock = () => {
    let Fblock = [[], []]
    data['elements'].forEach(item => {
        item['cpk-hex'] = COLOR_CATEGORY[item.category]
        const F = isF(item.number)
        if (F[0]) {
            Fblock[F[1]].push(item)
        }
    })
    return Fblock
}
export const groups = (withF = false) => {
    let groups = []
    data['elements'].forEach(item => {
        item['cpk-hex'] = COLOR_CATEGORY[item.category]
        const group = item.xpos
        const F = isF(item.number)
        if (!groups.hasOwnProperty(group)) {
            groups[group] = []
        }
        if (F[0]) {
            if (withF) {
                groups[group].push(item)
            }
        } else {
            groups[group].push(item)
        }
    })
    return [groups, getFblock()]
}
export const getPeriods = (withF = false) => {
    let periods = []
    let Fblock = getFblock()
    data['elements'].forEach(item => {
        item['cpk-hex'] = COLOR_CATEGORY[item.category]
        const period = item.period
        const F = isF(item.number)
        if (!periods.hasOwnProperty(period)) {
            periods[period] = []
        }
        if (F[0]) {
            if (withF) {
                periods[period].push(item)
            }
        } else {
            periods[period].push(item)
        }
        if (item.number === 57) {
            periods[period].push({...item, star: 1})
        }
        if (item.number === 89) {
            periods[period].push({...item, star: 2})
        }
    })
    return [periods, Fblock]
}
export const S_BLOCK = data.elements.filter(item => item.number === 2 || item.xpos === 2 || item.xpos === 1).map(item => item.number)
export const P_BLOCK = data.elements.filter(item => item.xpos >= 13 && item.number !== 2 && !isF(item.number)[0]).map(item => item.number)
export const D_BLOCK = data.elements.filter(item => (item.xpos >= 3 && item.xpos <= 12 && !isF(item.number)[0])).map(item => item.number)
export const F_BLOCK = data.elements.filter(item => isF(item.number)[0]).map(item => item.number)

export const GET_BLOCK = (number) => {
    if (S_BLOCK.includes(number)) return 's';
    if (P_BLOCK.includes(number)) return 'p';
    if (D_BLOCK.includes(number)) return 'd';
    if (F_BLOCK.includes(number)) return 'f';

}

export const diff_data = {
    1: [...S_BLOCK, ...P_BLOCK.filter(item => item < 113)],
    2: [...S_BLOCK, ...P_BLOCK.filter(item => item < 113), ...EmptyArr(10, 21), ...EmptyArr(10, 39)],
    3: [...S_BLOCK, ...P_BLOCK.filter(item => item < 113), ...D_BLOCK.filter(item => !EmptyArr(9, 104).includes(item)), 89, 57],
    4: [...S_BLOCK, ...P_BLOCK, ...D_BLOCK, 89, 57],
    5: [...S_BLOCK, ...P_BLOCK, ...D_BLOCK, ...F_BLOCK],
}
export const Totals = {
    1: {'s': 14, 'p': 30, 'd': 0, 'f': 0},
    2: {'s': 14, 'p': 30, 'd': 20, 'f': 0},
    3: {'s': 14, 'p': 30, 'd': 29, 'f': 2},
    4: {'s': 14, 'p': 36, 'd': 38, 'f': 2},
    5: {'s': 14, 'p': 36, 'd': 38, 'f': 30},
}

export const TestData = (level = -1, noTest = false) => {
    let temp = data['elements'].map(item => ({
        'symbol': item.symbol,
        'name': item.name,
        group: item.xpos,
        'period': item.period,
        'number': item.number,
        'valueSymbol': '',
        'valueName': '',
        inTest: noTest ? false : (level < 0 || diff_data[level].includes(item.number))
    }))
    return temp
}
export const ORDER = [
    1, 44, 2, 8, 14, 20, 26, 32, 38, 45, 3, 9, 15, 21, 27, 33, 39, 46, 4, 10, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 16, 22, 28, 34, 40, 47, 5, 11, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 17, 23, 29, 35, 41, 48, 6, 12, 71,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 72, 74, 75, 76, 77, 78, 79, 80, 18, 24, 30, 36, 42, 49, 7, 13, 81, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118

]