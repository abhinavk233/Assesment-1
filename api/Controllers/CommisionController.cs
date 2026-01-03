using Microsoft.AspNetCore.Mvc;

namespace AvalphaTechnologies.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
           if (calculationRequest == null || calculationRequest.LocalSalesCount<0 ||calculationRequest.ForeignSalesCount < 0 ||calculationRequest.AverageSaleAmount< 0){
            return BadRequest("Invalid input values for calculation .");
           }

           decimal AvalphaTechnologiesCommission =(0.20m*calculationRequest.LocalSalesCount+0.35m * calculationRequest.ForeignSalesCount)*calculationRequest.AverageSaleAmount;
           decimal CompetitorCommission =(0.20m*calculationRequest.LocalSalesCount+0.0755m * calculationRequest.ForeignSalesCount)*calculationRequest.AverageSaleAmount;
           var response=new CommissionCalculationResponse
           {
            AvalphaTechnologiesCommissionAmount=decimal.Round(AvalphaTechnologiesCommission,2),
            CompetitorCommissionAmount=decimal.Round(CompetitorCommission,2)
           };
            return Ok(response);
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal AvalphaTechnologiesCommissionAmount { get; set; }

        public decimal CompetitorCommissionAmount { get; set; }
    }
}
