import { expect } from 'chai'
import { ethers, upgrades } from 'hardhat'
import { MyTokenV1 } from '../contracts/MyTokenV1.sol'
import { MyTokenV2 } from '../contracts/MyTokenV2.sol'

let myTokenV1: MyTokenV1 
let myTokenV2: MyTokenV2

describe('MyToken', function () {
  it('deploys', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1')
    myTokenV1 = (await upgrades.deployProxy(MyTokenV1, { kind: 'uups' })) as MyTokenV1
  })
  it('upgrades', async function () {
    const MyTokenV2 = await ethers.getContractFactory('MyTokenV2')
    myTokenV2 = (await upgrades.upgradeProxy(myTokenV1, MyTokenV2)) as MyTokenV2
  })
  it('adds with new function and variable', async function () {
    await myTokenV2.add(21)
    expect((await myTokenV2.num()).toString()).to.equal('21')
    await myTokenV2.add(21)
    expect((await myTokenV2.num()).toString()).to.equal('42')
  })
})