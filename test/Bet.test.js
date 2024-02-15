import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';

test('Test betUp function', () => {
    const wrapper = shallowMount(Blackjack);
    expect(wrapper.vm.bet).toBe(0);

    //Test that bet is equal to 5 after calling betUp function
    wrapper.vm.betUp();
    expect(wrapper.vm.bet).toBe(5);

    //Test that betUp will not increase above players money
    const money = wrapper.vm.money;
    for (let i=0; i < 100; i++) {
        wrapper.vm.betUp();
    }

    expect(wrapper.vm.bet).toBe(money);
});

test('Test betDown function', () => {
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.bet = 10;

    //Test that betDown function decreases bet by 5
    wrapper.vm.betDown();
    expect(wrapper.vm.bet).toBe(5);

    //Test that betDown will not decrease bet below 0
    for (let i=0; i < 100; i++) {
        wrapper.vm.betDown();
    }

    expect(wrapper.vm.bet).toBe(0);
});