import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { PresentationComponent } from "./header/projects/presentation/presentation.component";
import { ProjectsComponent } from "./header/projects/projects.component";
import { ColorsComponent } from "./header/settings/colors/colors.component";
import { FramefinishesComponent } from "./header/settings/framefinishes/framefinishes.component";
import { GlasscatsComponent } from "./header/settings/glasscats/glasscats.component";
import { GlassfinishesComponent } from "./header/settings/glassfinishes/glassfinishes.component";
import { GlasssubcatsComponent } from "./header/settings/glasssubcats/glasssubcats.component";
import { GlassvarientsComponent } from "./header/settings/glassvarients/glassvarients.component";
import { HandlesComponent } from "./header/settings/handles/handles.component";
import { HandlevarientsComponent } from "./header/settings/handlevarients/handlevarients.component";
import { ModelsComponent } from "./header/settings/models/models.component";
import { SettingsComponent } from "./header/settings/settings.component";
import { SubsystemsComponent } from "./header/settings/subsystems/subsystems.component";
import { SystemsComponent } from "./header/settings/systems/systems.component";
import { SystemtypesComponent } from "./header/settings/systemtypes/systemtypes.component";
import { GeneralsettingsComponent } from "./header/settings/generalsettings/generalsettings.component";
import { UsersComponent } from "./header/settings/users/users.component";
import { LoginComponent } from "./auth/login/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { WqgformComponent } from "./header/projects/wqgform/wqgform.component";
import { DownloadsComponent } from "./header/downloads/downloads.component";
import { SitedetailsComponent } from "./header/downloads/sitedetails/sitedetails.component";
import { CreateprojectComponent } from "./header/projects/createproject/createproject.component";
import { CompanydirComponent } from "./header/projects/createproject/companydir/companydir.component";
import { CompanyComponent } from "./header/settings/company/company.component";
import { KitchentypesComponent } from "./header/settings/kitchentypes/kitchentypes.component";
import { HingeComponent } from "./header/settings/hinge/hinge.component";
import { KitchenhandleComponent } from "./header/settings/kitchenhandle/kitchenhandle.component";
import { KitchenhandlepositionComponent } from "./header/settings/kitchenhandleposition/kitchenhandleposition.component";
import { DrawingsComponent } from "./header/settings/drawings/drawings.component";
import { MeasurementsheetComponent } from "./header/downloads/measurementsheet/measurementsheet.component";
import { GoodsdeliveryComponent } from "./header/downloads/goodsdelivery/goodsdelivery.component";
import { WorkcompletionComponent } from "./header/downloads/workcompletion/workcompletion.component";
import { CustomerfeedbackComponent } from "./header/downloads/customerfeedback/customerfeedback.component";
import { ModelResolve } from "./services/model.resolve";
import { GlassResolve } from "./services/glassfinish.resolve";
import { ColorResolve } from "./services/colors.resolve";
import { VariantResolve } from "./services/glassvariants.resolve";
import { IndependentworkComponent } from "./header/downloads/independentwork/independentwork.component";
import { IndependentgoodsComponent } from "./header/downloads/independentgoods/independentgoods.component";
import { IndependentmeasureComponent } from "./header/downloads/independentmeasure/independentmeasure.component";
import { IndependentcustomerComponent } from "./header/downloads/independentcustomer/independentcustomer.component";
import { AccountsComponent } from "./header/accounts/accounts.component";
import { AnalyticsComponent } from "./header/analytics/analytics.component";
import { DesignComponent } from "./header/settings/design/design.component";
import { GridComponent } from "./header/settings/grid/grid.component";
import { DesignpatternsComponent } from "./header/settings/designpatterns/designpatterns.component";
import { DesignPatternResolve } from "./services/designpattern.resolve";
import { GridResolve } from "./services/grid.resolve";
import { RequestsComponent } from "./header/projects/requests/requests.component";
import { SpecialrequestsComponent } from "./header/projects/specialrequests/specialrequests.component";
import { SubmitcusFBComponent } from "./header/downloads/submitcus-fb/submitcus-fb.component";
import { IncentivesComponent } from "./header/analytics/incentives/incentives.component";
import { ProplusreportComponent } from "./header/analytics/proplusreport/proplusreport.component";
import { GlassonlyComponent } from "./header/glassonly/glassonly.component";
import { GlassonlyprojectComponent } from "./header/glassonly/glassonlyproject/glassonlyproject.component";
import { GoprojectsComponent } from "./header/goprojects/goprojects.component";
import { GlassonlyfinishComponent } from "./header/settings/glassonlyfinish/glassonlyfinish.component";
import { GlasspresentationComponent } from "./header/projects/glasspresentation/glasspresentation.component";
import { GlassOnlyResolve } from "./services/glassonlyfinish.resolve";


const routes : Routes = [
{path: 'settings',component:SettingsComponent, canActivate : [AuthGuard]},

{path: 'settings/systems',component:SystemsComponent, canActivate : [AuthGuard]},
{path: 'settings/systems/edit/:systemId', component:SystemsComponent, canActivate : [AuthGuard]},

{path: 'settings/subsystems', component:SubsystemsComponent, canActivate : [AuthGuard]},
{path: 'settings/susbsystems/edit/:subsystemId', component:SubsystemsComponent, canActivate : [AuthGuard]},

{path: 'settings/systemtypes',component:SystemtypesComponent, canActivate : [AuthGuard]},
{path: 'settings/systemtypes/edit/:systemtypeId', component:SystemtypesComponent, canActivate : [AuthGuard]},

{path: 'settings/colors', component:ColorsComponent, canActivate : [AuthGuard]},
{path: 'settings/colors/edit/:colorId', component:ColorsComponent, canActivate : [AuthGuard]},

{path: 'settings/glasssubcats', component: GlasssubcatsComponent, canActivate : [AuthGuard]},
{path: 'settings/glasssubcats/edit/:glasssubcatId', component: GlasssubcatsComponent, canActivate : [AuthGuard]},

{path: 'settings/glasscats', component: GlasscatsComponent, canActivate : [AuthGuard]},
{path: 'settings/glasscats/edit/:glasscatId', component: GlasscatsComponent, canActivate : [AuthGuard]},

{path: 'settings/glasscats', component: GlasscatsComponent, canActivate : [AuthGuard]},
{path: 'settings/glasscats/edit/:glasscatId', component: GlasscatsComponent, canActivate : [AuthGuard]},

{path: 'settings/framefinishes', component: FramefinishesComponent, canActivate : [AuthGuard]},
{path: 'settings/framefinishes/edit/:framefinishId', component: FramefinishesComponent, canActivate : [AuthGuard]},

{path: 'settings/glassvariants', component: GlassvarientsComponent, canActivate : [AuthGuard]},
{path: 'settings/glassvariants/edit/:glassvariantId', component: GlassvarientsComponent, canActivate : [AuthGuard]},

{path: 'settings/glassfinishes', component: GlassfinishesComponent, canActivate : [AuthGuard]},
{path: 'settings/glassfinishes/edit/:glassfinishId', component: GlassfinishesComponent, canActivate : [AuthGuard]},


{path: 'settings/glassonlyfinishes', component: GlassonlyfinishComponent, canActivate : [AuthGuard]},
{path: 'settings/glassonlyfinishes/edit/:glassfinishId', component: GlassonlyfinishComponent, canActivate : [AuthGuard]},


{path: 'settings/handlevariants', component: HandlevarientsComponent, canActivate : [AuthGuard]},
{path: 'settings/handlevariants/edit/:handlevariantId', component: HandlevarientsComponent, canActivate : [AuthGuard]},

{path: 'settings/handles', component: HandlesComponent, canActivate : [AuthGuard]},
{path: 'settings/handles/edit/:handleId', component: HandlesComponent, canActivate : [AuthGuard]},

{path: 'settings/models', component: ModelsComponent, canActivate : [AuthGuard]},
{path: 'settings/models/edit/:modelId', component: ModelsComponent, canActivate : [AuthGuard]},

{path: 'settings/users', component: UsersComponent, canActivate : [AuthGuard]},
{path: 'settings/users/edit/:userId', component: UsersComponent, canActivate : [AuthGuard]},

{path: 'settings/designs', component: DesignComponent, canActivate : [AuthGuard]},
{path: 'settings/designs/edit/:designId', component: DesignComponent, canActivate : [AuthGuard]},

{path: 'settings/grids', component: GridComponent, canActivate : [AuthGuard]},
{path: 'settings/grids/edit/:gridId', component: GridComponent, canActivate : [AuthGuard]},

{path: 'settings/designpatterns', component: DesignpatternsComponent, canActivate : [AuthGuard],resolve: {models: DesignPatternResolve}},
{path: 'settings/designpatterns/edit/:designpatternId', component: DesignpatternsComponent, canActivate : [AuthGuard],resolve: {models: DesignPatternResolve }},



{path: 'settings/kitchentypes', component: KitchentypesComponent, canActivate : [AuthGuard]},
{path: 'settings/kitchentypes/edit/:kitchentypeId', component: KitchentypesComponent, canActivate : [AuthGuard]},

{path: 'settings/hinges', component: HingeComponent, canActivate : [AuthGuard]},
{path: 'settings/hinges/edit/:hingeId', component: HingeComponent, canActivate : [AuthGuard]},

{path: 'settings/kitchenhandles', component: KitchenhandleComponent, canActivate : [AuthGuard]},
{path: 'settings/kitchenhandles/edit/:kitchenhandleId', component: KitchenhandleComponent, canActivate : [AuthGuard]},

{path: 'settings/kitchenhandlepositions', component: KitchenhandlepositionComponent, canActivate : [AuthGuard]},
{path: 'settings/kitchenhandlepositions/edit/:kitchenhandlepositionId', component: KitchenhandlepositionComponent, canActivate : [AuthGuard]},

{path: 'settings/drawings', component: DrawingsComponent, canActivate : [AuthGuard]},
{path: 'settings/drawings/edit/:drawingId', component: DrawingsComponent, canActivate : [AuthGuard]},

{path: 'settings/generalsettings', component: GeneralsettingsComponent, canActivate : [AuthGuard]},

{path: 'login', component: LoginComponent },

{path: 'newproject', component: CreateprojectComponent, canActivate : [AuthGuard]},

{path: 'project', component: WqgformComponent, canActivate : [AuthGuard]},
{path: 'project/:orderId', component: WqgformComponent, canActivate : [AuthGuard]},

{path: 'measurement', component: MeasurementsheetComponent, resolve: {models: ModelResolve}},
{path: 'measurement/:orderId', component: MeasurementsheetComponent, resolve: {models: ModelResolve}},

{path: 'indmeasurement', component: IndependentmeasureComponent, resolve: {models: ModelResolve}},
{path: 'indmeasurement/:orderId', component: IndependentmeasureComponent, resolve: {models: ModelResolve}},

{path: 'goodsdelivery', component: GoodsdeliveryComponent},
{path: 'goodsdelivery/:orderId', component: GoodsdeliveryComponent},

{path: 'indgoodsdelivery', component: IndependentgoodsComponent},
{path: 'indgoodsdelivery/:orderId', component: IndependentgoodsComponent},

{path: 'workcompletion', component: WorkcompletionComponent,resolve: {models: ModelResolve}},
{path: 'workcompletion/:orderId', component: WorkcompletionComponent,resolve: { models: ModelResolve }},

{path: 'indworkcompletion', component: IndependentworkComponent,resolve: {models: ModelResolve}},
{path: 'indworkcompletion/:orderId', component: IndependentworkComponent,resolve: { models: ModelResolve }},

{path: 'customerfeedback', component: CustomerfeedbackComponent},
{path: 'customerfeedback/:orderId', component: CustomerfeedbackComponent, canActivate : []},

{path: 'submitcustomerfeedback/:orderId', component: SubmitcusFBComponent},

{path: 'indcustomerfeedback', component: IndependentcustomerComponent},
{path: 'indcustomerfeedback/:orderId', component: IndependentcustomerComponent},

{path: 'project', component: WqgformComponent, canActivate : [AuthGuard]},
{path: 'project/:orderId', component: WqgformComponent, canActivate : [AuthGuard]},

{path: 'accounts', component: AccountsComponent, canActivate : [AuthGuard]},
{path: 'analytics', component: AnalyticsComponent, canActivate : [AuthGuard]},


{path: 'glassproject/:orderId', component: GlassonlyComponent, canActivate : [AuthGuard]},
{path: 'goprojects', component: GoprojectsComponent, canActivate : [AuthGuard]},

{path: 'glass', component: GlassonlyprojectComponent, canActivate : [AuthGuard]},


{path: 'downloads', component: DownloadsComponent, canActivate : [AuthGuard]},
{path: 'sitedetails', component: SitedetailsComponent, canActivate : [AuthGuard]},



{path: 'requests', component: SpecialrequestsComponent, canActivate : [AuthGuard]},



{path: 'projects', component: ProjectsComponent, canActivate : [AuthGuard]},

{path: 'incentives', component: IncentivesComponent, canActivate : [AuthGuard]},
{path: 'proplusreport', component: ProplusreportComponent, canActivate : [AuthGuard]},

{path: 'presentation/:id', component: PresentationComponent, canActivate : [AuthGuard],resolve: { models: ModelResolve,glassfinishes :GlassResolve,colors : ColorResolve, glassvariants : VariantResolve, grids : GridResolve }},

{path: 'glasspresentation/:id', component: GlasspresentationComponent, canActivate : [AuthGuard],resolve: { glassonlyfinishes :GlassOnlyResolve }},


{path: 'settings/company', component: CompanyComponent, canActivate : [AuthGuard]},

];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule],
providers:[AuthGuard]

})

export class AppRoutingModule{}

