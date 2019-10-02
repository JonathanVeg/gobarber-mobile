import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useMemo, useState } from 'react';
import { DatePickerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateButton, Picker } from './styles';

export default function DateInput({date, onChange}) {
  const [opened, setOpened] = useState(false);

  const dateFormat = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton onClick={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormat}</DateText>
        {opened && (
          <Picker>
            <DatePickerIOS
              date={date}
              onDateChange={onChange}
              minimumDate={new Date()}
              minuteInterval={60}
              locale="pt"
              mode="date"
            />
          </Picker>
        )}
      </DateButton>
    </Container>
  );
}
