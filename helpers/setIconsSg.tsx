import careers1 from '../public/assets/icons/sg-career-1.svg'
import careers2 from '../public/assets/icons/sg-career-2.svg'
import careers3 from '../public/assets/icons/sg-career-3.svg'
import careers4 from '../public/assets/icons/sg-career-4.svg'

import finance1 from '../public/assets/icons/sg-finance-1.svg'
import finance2 from '../public/assets/icons/sg-finance-2.svg'
import finance3 from '../public/assets/icons/sg-finance-3.svg'

import int1 from '../public/assets/icons/sg-int-1.svg';
import int2 from '../public/assets/icons/sg-int-2.svg';
import int3 from '../public/assets/icons/sg-int-3.svg';
import int4 from '../public/assets/icons/sg-int-4.svg';
import int5 from '../public/assets/icons/sg-int-5.svg';
import int6 from '../public/assets/icons/sg-int-6.svg';
import int8 from '../public/assets/icons/sg-int-8.svg';
import int9 from '../public/assets/icons/sg-int-9.svg';
import int10 from '../public/assets/icons/sg-int-10.svg';
import int11 from '../public/assets/icons/sg-int-11.svg';
import int12 from '../public/assets/icons/sg-int-12.svg';
import int13 from '../public/assets/icons/sg-int-13.png';
import int14 from '../public/assets/icons/sg-int-14.svg';
import int15 from '../public/assets/icons/sg-int-15.svg';
import int16 from '../public/assets/icons/sg-int-16.svg';

import rl1 from '../public/assets/icons/sg-rl-1.svg'
import rl5 from '../public/assets/icons/sg-rl-5.svg'
import rl7 from '../public/assets/icons/sg-rl-7.svg'

import source1 from '../public/assets/icons/sg-source-1.svg'
import source2 from '../public/assets/icons/sg-source-2.svg'
import source3 from '../public/assets/icons/sg-source-3.svg'
import source5 from '../public/assets/icons/sg-source-5.svg'
import source6 from '../public/assets/icons/sg-source-6.svg'


import target1 from '../public/assets/icons/sg-target-1.svg'
import target2 from '../public/assets/icons/sg-target-2.svg'
import target3 from '../public/assets/icons/sg-target-3.svg'
import target4 from '../public/assets/icons/sg-target-4.svg'
import target5 from '../public/assets/icons/sg-target-5.svg'

import vk1 from '../public/assets/icons/sg-wk-1.svg';
import vk2 from '../public/assets/icons/sg-vk-2.svg'
import vk3 from '../public/assets/icons/sg-vk-3.svg'
import vk4 from '../public/assets/icons/sg-vk-4.svg'


type sgTypes = 'careers' | 'finance_states' | 'intersets' | 'rl' | 'sources' | 'targets' | 'want_kids'

const setIconsSg = (type: sgTypes, id: number | string) => {
    if(type === 'careers') {
        if(id == 1) {
            return careers1
        }
        if(id == 2) {
            return careers2
        }
        if(id == 3) {
            return careers3
        }
        if(id == 4) {
            return careers4
        }
        return null
    }
    if(type === 'finance_states') {
        if(id == 1) {
            return finance1
        }
        if(id == 2) {
            return finance2
        }
        if(id == 3) {
            return finance3
        }
        return null
    }
    if(type === 'intersets') {
        if(id == 1) {
            return int1
        }
        if(id == 2) {
            return int2
        }
        if(id == 3) {
            return int3
        }
        if(id == 4) {
            return int4
        }
        if(id == 5) {
            return int5
        }
        if(id == 6) {
            return int6
        }
        if(id == 8) {
            return int8
        }
        if(id == 9) {
            return int9
        }
        if(id == 10) {
            return int10
        }
        if(id == 11) {
            return int11
        }   
        if(id == 12) {
            return int12
        }
        if(id == 13) {
            return int13
        }
        if(id == 14) {
            return int14
        }
        if(id == 15) {
            return int15
        }
        if(id == 16) {
            return int16
        }
        return null
    }
    if(type === 'rl') {
        if(id == 1) {
            return rl1
        }
        if(id == 5) {
            return rl5
        }
        if(id == 7) {
            return rl7
        }
        return null
    }
    if(type === 'sources') {
        if(id == 1) {
            return source1
        }
        if(id == 2) {
            return source2
        }
        if(id == 3) {
            return source3
        }
        if(id == 4) {
            return null
        }
        if(id == 5) {
            return source5
        }
        if(id == 6) {
            return source6
        }
        return null
    }
    if(type === 'targets') {
        if(id == 1) {
            return target1
        }
        if(id == 2) {
            return target2
        }
        if(id == 3) {
            return target3
        }
        if(id == 4) {
            return target4
        }
        if(id == 5) {
            return target5
        }
        return null
    }
    if(type === 'want_kids') {
        if(id == 1) {
            return vk1
        }
        if(id == 2) {
            return vk2
        }
        if(id == 3) {
            return vk3
        }
        if(id == 4) {
            return vk4
        }
        return null
    }
}

export default setIconsSg;