import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../api';

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { data: room } = useQuery(['rooms', roomPk], getRoom);
  return <div>room detail</div>;
}
