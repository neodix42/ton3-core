import { Builder, Cell, BOC, Slice } from '../src/boc'
import { HashmapE } from '../src/boc/hashmap'
import { Bit } from '../src/types/bit'

const cell = BOC.fromStandard('B5EE9C72410106010020000101C0010202C8020302016204050007BEFDF2180007A68054C00007A08090C08D16037D')
const cell2 = BOC.fromStandard('B5EE9C7241010501001D0002012001020201CF03040009BC0068054C0007B91012180007BEFDF218CFA830D9')

const serializers = {
    key: (k: number): Bit[] => new Builder().storeUint(k, 16).bits,
    value: (v: number): Cell => new Builder().storeUint(v, 16).cell()
}

const deserializers = {
    key: (k: Bit[]): number => Slice.parse(new Builder().storeBits(k).cell()).loadUint(16),
    value: (v: Cell): number => Slice.parse(v).loadUint(16)
}

const dict = new HashmapE<number, number>(16, { serializers })

dict.set(13, 169)
dict.set(17, 289)
dict.set(239, 57121)

const result = dict.cell()

const test11 = BOC.toHexStandard(result)
const test22 = BOC.fromStandard(test11)

const dict2 = new HashmapE<number, number>(16, { serializers })

dict2.set(17, 289)
dict2.set(239, 57121)
dict2.set(32781, 169)

const result2 = dict2.cell()

const result3 = HashmapE.parse(16, Slice.parse(result2), { serializers, deserializers })

const result4 = HashmapE.parse(16, Slice.parse(result), { serializers, deserializers })

console.log('----- simple - by fift' + '\n')
console.log(cell.hash() + '\n')
console.log(cell.print())
console.log('----- simple - by ton3' + '\n')
console.log(result.hash() + '\n')
console.log(result.print())
console.log('----- both-edges - by fift' + '\n')
console.log(cell2.hash() + '\n')
console.log(cell2.print())
console.log('----- both-edges - by ton3' + '\n')
console.log(result2.hash() + '\n')
console.log(result2.print())
console.log([ ...result3 ])
console.log([ ...result4 ])
console.log('------------------------------')
console.log(JSON.stringify(cell))
console.log(JSON.stringify(test22))