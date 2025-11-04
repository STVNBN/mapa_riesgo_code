import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {

  reportes = [
    {
      id: 1,
      tipo: 'Inundación',
      descripcion: 'Calle anegada cerca del centro.',
      direccion: 'Av. España #123',
      latitud: 13.702,
      longitud: -89.216,
      foto: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      tipo: 'Incendio',
      descripcion: 'Fuego controlado en zona industrial.',
      direccion: 'Col. San Benito',
      latitud: 13.705,
      longitud: -89.220,
      foto: 'https://via.placeholder.com/80'
    }
  ];

  ngOnInit(): void {}
}
