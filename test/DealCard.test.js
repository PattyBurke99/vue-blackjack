import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';

test('Test that the app can fetch a new deck from the API and the player can draw a card from it', async () => {
    //create instance of Blackjack component in jsdom for testing, fetch new deck id and draw card from it from API
    const wrapper = shallowMount(Blackjack);
    await wrapper.vm.fetchNewDeck();
    await wrapper.vm.dealCard(wrapper.vm.playerCards, true, false);

    //expect the length of the playerCards array to now be 1
    expect(wrapper.vm.playerCards.length).toBe(1);
});

test('Test that the app can fetch a new deck from the API and the dealer can draw a card from it', async () => {
    //create instance of Blackjack component in jsdom for testing, fetch new deck id and draw card from it from API
    const wrapper = shallowMount(Blackjack);
    await wrapper.vm.fetchNewDeck();
    await wrapper.vm.dealCard(wrapper.vm.dealerCards, false, false);

    //expect the length of the playerCards array to now be 1
    expect(wrapper.vm.dealerCards.length).toBe(1);
});