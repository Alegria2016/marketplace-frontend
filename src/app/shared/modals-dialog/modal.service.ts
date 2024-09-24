import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'app/core/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _dialag = inject(MatDialog);

  constructor() { }

  openModal<CT, T =User>(componentRef: ComponentType<CT>, data?: T, isEditing = false ): void {

      const config = { data, isEditing };

      this._dialag.open(componentRef,{
        data: config,
        width: '500px'
      });
  }


  closeModal(): void{
    this._dialag.closeAll();

  }
}
