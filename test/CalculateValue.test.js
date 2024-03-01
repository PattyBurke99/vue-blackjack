import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';

test('Test that CalculateValue function will correctly evaluate a 6 and a 5 as 11', () => {
    //create instance of Blackjack component in jsdom for testing, set initial values
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.playerCards = [
        {
            value: '6',
            suit: 'DIAMONDS'
        },
        {
            value: '5',
            suit: 'DIAMONDS'
        }
    ]

    expect(wrapper.vm.calculateValue(wrapper.vm.playerCards)).toStrictEqual({ value: 11, or: 11 });
});

test('Test that CalculateValue function will correctly evaluate a 6 and an ace  7 or 17', () => {
    //create instance of Blackjack component in jsdom for testing, set initial values
    const wrapper = shallowMount(Blackjack);
    wrapper.vm.playerCards = [
        {
            value: 'ACE',
            suit: 'SPADES'
        },
        {
            value: '6',
            suit: 'CLUBS'
        }
    ]

    expect(wrapper.vm.calculateValue(wrapper.vm.playerCards)).toStrictEqual({ value: 7, or: 17 });
});