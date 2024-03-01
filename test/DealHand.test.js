import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';

test('Test that the app can fetch a new deck from the API and the dealHand function can be called successfully', async () => {
    //create instance of Blackjack component in jsdom for testing, fetch new deck id and deal hand from it from API
    const wrapper = shallowMount(Blackjack);
    await wrapper.vm.fetchNewDeck();
    await wrapper.vm.dealHand();

    //expect the length of the playerCards array to now be 1
    expect(wrapper.vm.playerCards.length).toBe(2);
    expect(wrapper.vm.dealerCards.length).toBe(2);
});