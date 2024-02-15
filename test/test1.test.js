import { expect, test } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import Blackjack from '../src/components/Blackjack.vue';


test('Test', async () => {
    const wrapper = shallowMount(Blackjack);

    await wrapper.vm.dealHand();
    expect(wrapper.vm.playerCards.length).toBe(2);
})