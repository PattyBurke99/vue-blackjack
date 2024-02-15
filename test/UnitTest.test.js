import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';

test('Test that game data initializes correctly', async () => {
    const wrapper = shallowMount(Blackjack);
    expect(wrapper.vm.deckId).toBe('');
    expect(wrapper.vm.playerCards).toStrictEqual([]);
    expect(wrapper.vm.dealerCards).toStrictEqual([]);
    expect(wrapper.vm.playerCardValue).toStrictEqual({});
    expect(wrapper.vm.dealerCardValue).toStrictEqual({});
    expect(wrapper.vm.cardsInDeck).toBe('N/a');
    expect(wrapper.vm.inPlay).toBe(false);
    expect(wrapper.vm.standing).toBe(false);
    expect(wrapper.vm.money).toBe(100);
    expect(wrapper.vm.bet).toBe(0);
    expect(wrapper.vm.showMessage).toBe(false);
    expect(wrapper.vm.message).toBe('');
});