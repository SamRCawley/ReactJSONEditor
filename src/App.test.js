import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import template from './utils/template';
import hash from './utils/hash';


//not working.  Need to reformat JSON template to match formatting that will output
test('SHA256 calc matches known calculation', () => {
  let oldHash = template.checksum;
  template.checksum = ""
  hash(template);
  expect(template.checksum).toBe(oldHash);
});

test('Remove button removes items', async () =>{
  render(<App/>);
  //test removing value
  let checksum = /"checksum": "(.+)"/.exec(screen.getByText(/"checksum": "(.+)"/).innerHTML)[1];
  expect(screen.getAllByText(/playerID/)).toBeTruthy();
  await fireEvent.click(screen.getAllByText(/playerID/)[0].parentNode.querySelector('svg[data-testid="DeleteForeverIcon"]'));
  expect(screen.queryByText(/playerID/)).toBeFalsy();
  //test removing array item
  expect(screen.getAllByDisplayValue(/MOONSPELL/)).toBeTruthy();
  await fireEvent.click(screen.getAllByDisplayValue(/MOONSPELL/)[0].parentNode.parentNode.parentNode.querySelector('svg[data-testid="DeleteForeverIcon"]'));
  expect(screen.queryByText(/MOONSPELL/)).toBeFalsy();
  //checksum should change
  expect(/"checksum": "(.+)"/.exec(screen.getByText(/"checksum": "(.+)"/).innerHTML)[1]).not.toBe(checksum);
});
