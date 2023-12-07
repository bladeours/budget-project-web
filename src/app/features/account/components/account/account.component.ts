import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountDialogComponent} from "../../../../shared/components/dialogs/account-dialog/account-dialog.component";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {
    hash: string;

    constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
        this.route.queryParams.subscribe(v => {
            this.hash = v['id'];
        });
    }

}
