import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './header/settings/settings.component';
import { SystemsComponent } from './header/settings/systems/systems.component';
import { SubsystemsComponent } from './header/settings/subsystems/subsystems.component';
import { SystemtypesComponent } from './header/settings/systemtypes/systemtypes.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxPrintModule } from 'ngx-print';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';





import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SubstableComponent } from './header/settings/subsystems/substable/substable.component';
import { TypetableComponent } from './header/settings/systemtypes/typetable/typetable.component';
import { SystableComponent } from './header/settings/systems/systable/systable.component';
import { ColorsComponent } from './header/settings/colors/colors.component';
import { GlasssubcatsComponent } from './header/settings/glasssubcats/glasssubcats.component';
import { ColortableComponent } from './header/settings/colors/colortable/colortable.component';
import { GlasssbtableComponent } from './header/settings/glasssubcats/glasssbtable/glasssbtable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlasscatsComponent } from './header/settings/glasscats/glasscats.component';
import { FramefinishesComponent } from './header/settings/framefinishes/framefinishes.component';
import { HandlesComponent } from './header/settings/handles/handles.component';
import { HandlevarientsComponent } from './header/settings/handlevarients/handlevarients.component';
import { GlassfinishesComponent } from './header/settings/glassfinishes/glassfinishes.component';
import { GlassvarientsComponent } from './header/settings/glassvarients/glassvarients.component';
import { ModelsComponent } from './header/settings/models/models.component';
import { GlasscattableComponent } from './header/settings/glasscats/glasscattable/glasscattable.component';
import { FftableComponent } from './header/settings/framefinishes/fftable/fftable.component';
import { GlassvartableComponent } from './header/settings/glassvarients/glassvartable/glassvartable.component';
import { GlassfintableComponent } from './header/settings/glassfinishes/glassfintable/glassfintable.component';
import { HandlevartabComponent } from './header/settings/handlevarients/handlevartab/handlevartab.component';
import { HandletabComponent } from './header/settings/handles/handletab/handletab.component';
import { ModtableComponent } from './header/settings/models/modtable/modtable.component';
import { ProjectsComponent } from './header/projects/projects.component';
import { WqgformComponent } from './header/projects/wqgform/wqgform.component';


import { PresentationComponent } from './header/projects/presentation/presentation.component';
import { LoginComponent } from './auth/login/login/login.component';
import { GeneralsettingsComponent } from './header/settings/generalsettings/generalsettings.component';
import { UsersComponent } from './header/settings/users/users.component';
import { UsertableComponent } from './header/settings/users/usertable/usertable.component'
import { AuthInterceptor } from './auth/auth-interceptor';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { LedgerdetailsComponent } from './header/projects/ledgerdetails/ledgerdetails.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { DownloadsComponent } from './header/downloads/downloads.component';
import { SitedetailsComponent } from './header/downloads/sitedetails/sitedetails.component';
import { MeasurementsheetComponent } from './header/downloads/measurementsheet/measurementsheet.component';
import { WorkcompletionComponent } from './header/downloads/workcompletion/workcompletion.component';
import { GoodsdeliveryComponent } from './header/downloads/goodsdelivery/goodsdelivery.component';
import { CustomerfeedbackComponent } from './header/downloads/customerfeedback/customerfeedback.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CreateprojectComponent } from './header/projects/createproject/createproject.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InterceptorService } from './services/interceptor.service';
import { CompanydirComponent } from './header/projects/createproject/companydir/companydir.component';
import { CompanyComponent } from './header/settings/company/company.component';
import { KitchentypesComponent } from './header/settings/kitchentypes/kitchentypes.component';
import { KttableComponent } from './header/settings/kitchentypes/kttable/kttable.component';
import { DrawingsComponent } from './header/settings/drawings/drawings.component';
import { KitchenhandleComponent } from './header/settings/kitchenhandle/kitchenhandle.component';
import { KitchenhandlepositionComponent } from './header/settings/kitchenhandleposition/kitchenhandleposition.component';
import { HingeComponent } from './header/settings/hinge/hinge.component';
import { HingetableComponent } from './header/settings/hinge/hingetable/hingetable.component';
import { KhptableComponent } from './header/settings/kitchenhandleposition/khptable/khptable.component';
import { KhtableComponent } from './header/settings/kitchenhandle/khtable/khtable.component';
import { DtableComponent } from './header/settings/drawings/dtable/dtable.component';
import { CanvasComponent } from './canvas/canvas.component';
import { KitchendialogComponent } from './header/projects/wqgform/kitchendialog/kitchendialog.component';
import { SelectfinishesComponent } from './header/settings/models/selectfinishes/selectfinishes.component';
import { LoaderComponent } from './header/projects/loader/loader.component';
import { ErrorComponent } from './header/projects/error/error.component';
import { IndependentmeasureComponent } from './header/downloads/independentmeasure/independentmeasure.component';
import { IndependentworkComponent } from './header/downloads/independentwork/independentwork.component';
import { IndependentgoodsComponent } from './header/downloads/independentgoods/independentgoods.component';
import { IndependentcustomerComponent } from './header/downloads/independentcustomer/independentcustomer.component';
import {MatTooltipModule} from '@angular/material/tooltip';


import { WinComponent } from './header/projects/win/win.component';
import { AccountsComponent } from './header/accounts/accounts.component';
import { AnalyticsComponent } from './header/analytics/analytics.component';
import { CommercialwinComponent } from './header/projects/commercialwin/commercialwin.component';
import { HandoverComponent } from './header/projects/handover/handover.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { GetjbComponent } from './header/projects/getjb/getjb.component';
import { PerformanceComponent } from './header/projects/performance/performance.component';
import { ComboChartComponent } from './combo-chart/combo-chart.component';
import { ProcorewinComponent } from './header/projects/procorewin/procorewin.component';
import { GridComponent } from './header/settings/grid/grid.component';
import { DesignComponent } from './header/settings/design/design.component';
import { DesignpatternsComponent } from './header/settings/designpatterns/designpatterns.component';
import { DesigntableComponent } from './header/settings/design/designtable/designtable.component';
import { GridtableComponent } from './header/settings/grid/gridtable/gridtable.component';
import { GetjbproComponent } from './header/projects/getjbpro/getjbpro.component';
import { SpecialrequestsComponent } from './header/projects/specialrequests/specialrequests.component';
import { RequestsComponent } from './header/projects/requests/requests.component';
import { SubmitcusFBComponent } from './header/downloads/submitcus-fb/submitcus-fb.component';
import { IncentivesComponent } from './header/analytics/incentives/incentives.component';
import { ProplusreportComponent } from './header/analytics/proplusreport/proplusreport.component';
import { GlassonlyComponent } from './header/glassonly/glassonly.component';
import { GlassonlyprojectComponent } from './header/glassonly/glassonlyproject/glassonlyproject.component';
import { ReactivetableComponent } from './header/glassonly/reactivetable/reactivetable.component';
import { GoprojectsComponent } from './header/goprojects/goprojects.component';
import { GlassonlyfinishComponent } from './header/settings/glassonlyfinish/glassonlyfinish.component';
import { GgotableComponent } from './header/settings/glassonlyfinish/ggotable/ggotable.component';
import { GlasspresentationComponent } from './header/projects/glasspresentation/glasspresentation.component';
import { GlassledgerdetailsComponent } from './header/glassonly/glassledgerdetails/glassledgerdetails.component';
import { GlasshandoverComponent } from './header/glassonly/glasshandover/glasshandover.component';
import { GlasscommercialwinComponent } from './header/glassonly/glasscommercialwin/glasscommercialwin.component';
import { ProjectdetailsComponent } from './header/projects/projectdetails/projectdetails.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent,
    SystemsComponent,
    SubsystemsComponent,
    SystemtypesComponent,
    SubstableComponent,
    TypetableComponent,
    SystableComponent,
    ColorsComponent,
    GlasssubcatsComponent,
    ColortableComponent,
    GlasssbtableComponent,
    GlasscatsComponent,
    FramefinishesComponent,
    HandlesComponent,
    HandlevarientsComponent,
    GlassfinishesComponent,
    GlassvarientsComponent,
    ModelsComponent,
    GlasscattableComponent,
    FftableComponent,
    GlassvartableComponent,
    GlassfintableComponent,
    HandlevartabComponent,
    HandletabComponent,
    ModtableComponent,
    ProjectsComponent,
    WqgformComponent,
    PresentationComponent,
    LoginComponent,
    GeneralsettingsComponent,
    UsersComponent,
    UsertableComponent,
    LedgerdetailsComponent,
    DownloadsComponent,
    SitedetailsComponent,
    MeasurementsheetComponent,
    WorkcompletionComponent,
    GoodsdeliveryComponent,
    CustomerfeedbackComponent,
    CreateprojectComponent,
    CompanydirComponent,
    CompanyComponent,
    KitchentypesComponent,
    KttableComponent,
    DrawingsComponent,
    KitchenhandleComponent,
    KitchenhandlepositionComponent,
    HingeComponent,
    HingetableComponent,
    KhptableComponent,
    KhtableComponent,
    DtableComponent,
    CanvasComponent,
    KitchendialogComponent,
    SelectfinishesComponent,
    LoaderComponent,
    ErrorComponent,
    IndependentmeasureComponent,
    IndependentworkComponent,
    IndependentgoodsComponent,
    IndependentcustomerComponent,
    WinComponent,
    AccountsComponent,
    AnalyticsComponent,
    CommercialwinComponent,
    HandoverComponent,
    GetjbComponent,
    PerformanceComponent,
    ComboChartComponent,
    ProcorewinComponent,
    GridComponent,
    DesignComponent,
    DesignpatternsComponent,
    DesigntableComponent,
    GridtableComponent,
    GetjbproComponent,
    SpecialrequestsComponent,
    RequestsComponent,
    SubmitcusFBComponent,
    IncentivesComponent,
    ProplusreportComponent,
    GlassonlyComponent,
    GlassonlyprojectComponent,
    ReactivetableComponent,
    GoprojectsComponent,
    GlassonlyfinishComponent,
    GgotableComponent,
    GlasspresentationComponent,
    GlassledgerdetailsComponent,
    GlasshandoverComponent,
    GlasscommercialwinComponent,
    ProjectdetailsComponent
   

    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    NgxPrintModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    AutocompleteLibModule,
    MatSlideToggleModule,
    
    //NgxChartModule,
    NgxChartsModule,
    MatTooltipModule
    
  
  ],
  providers: [
    {provide :HTTP_INTERCEPTORS,useClass : AuthInterceptor, multi :true}
    
  ],
  bootstrap: [AppComponent],
 // entryComponents : [LedgerdetailsComponent]
})
export class AppModule { }
