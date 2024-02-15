import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';

test('Test that betUp function increases bet by 5', () => {
    //create instance of Blackjack component in jsdom for testing, set initial values
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.bet = 0;

    //Test that bet is equal to 5 after calling betUp function
    wrapper.vm.betUp();
    expect(wrapper.vm.bet).toBe(5);
});

test('Test that betUp function will not increase bet above money', () => {
    //create instance of Blackjack component in jsdom for testing, set initial values
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.bet = 100;
    wrapper.vm.money = 100;

    //Test that bet is still equal to 100 after calling betUp
    wrapper.vm.betUp();
    expect(wrapper.vm.bet).toBe(100);
});

test('Test that betDown function decreases bet by 5', () => {
    //create instance of Blackjack component in jsdom for testing, set initial values
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.bet = 10;

    //Test that betDown function decreases bet by 5
    wrapper.vm.betDown();
    expect(wrapper.vm.bet).toBe(5);
});

test('Test that betDown function will not decrease bet below 0', () => {
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.bet = 0;

    //Test that bet is still equal to 0
    wrapper.vm.betDown();
    expect(wrapper.vm.bet).toBe(0);
});