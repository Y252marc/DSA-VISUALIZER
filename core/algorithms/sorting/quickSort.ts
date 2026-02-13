import { SortStep } from "@/core/types";
import { setReactDebugChannelForHtmlRequest } from "next/dist/server/dev/debug-channel";
import { ButtonHTMLAttributes } from "react";

export const quickSortCode = `procedure partition(A, lo, hi)
  pivot := A[hi]
  i := lo
  for j := lo to hi - 1 do
    if A[j] < pivot then
      swap A[i] with A[j]
      i := i + 1
    end if
  end for
  swap A[i] with A[hi]
  return i
end procedure

procedure quickSort(A, lo, hi)
  if lo < hi then
    p := partition(A, lo, hi)
    quickSort(A, lo, p - 1)
    quickSort(A, p + 1, hi)
  end if
end procedure`;

export function* quickSort(input: number[]): Generator<SortStep> {
    const arr = [...input];
    const sortedIndices: number[] = [];

    yield {
        array: [...arr],
        sorted: [],
        comparing: null,
        swapped: null,
        description: "Starting Quick Sort",
        codeLine: 14,
    };

    yield* quickSortHelper(arr, 0, arr.length - 1, sortedIndices);

    yield {
        array: [...arr],
        sorted: Array.from({ length: arr.length }, (_, i) => i),
        comparing: null,
        swapped: null,
        description: "Sorting complete",
        codeLine: 19,
    };
}

function* quickSortHelper(
    arr: number[],
    lo: number,
    hi: number,
    sortedIndices: number[]
): Generator<SortStep> {
    if (lo >= hi) {
        if (lo === hi) {
            sortedIndices.push(lo);
            yield {
                array: [...arr],
                sorted: [...sortedIndices],
                comparing: null,
                swapped: null,
                description: `Single element ${arr[lo]} is sorted`,
                codeLine: 15,
            };
        }
        return;
    }

    // Partition
    const pivotIndex = hi;
    const pivotValue = arr[hi];

    yield {
        array: [...arr],
        sorted: [...sortedIndices],
        comparing: null,
        swapped: null,
        pivot: pivotIndex, // Purple
        range: [lo, hi], // Focus area
        description: `Partitioning range [${lo}, ${hi}] with pivot ${pivotValue}`,
        codeLine: 2,
    };

    let i = lo;

    yield {
        array: [...arr],
        sorted: [...sortedIndices],
        comparing: null,
        swapped: null,
        pivot: pivotIndex,
        left: i, // Cyan scanner
        range: [lo, hi],
        description: `Initialize i at ${i}`,
        codeLine: 3,
    };

    for (let j = lo; j < hi; j++) {
        yield {
            array: [...arr],
            sorted: [...sortedIndices],
            comparing: [j],
            swapped: null,
            pivot: pivotIndex,
            left: i, // Cyan
            right: j, // Yellow
            range: [lo, hi],
            description: `Comparing A[${j}] (${arr[j]}) < Pivot (${pivotValue})`,
            codeLine: 5,
        };

        if (arr[j] < pivotValue) {
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                yield {
                    array: [...arr],
                    sorted: [...sortedIndices],
                    comparing: null,
                    swapped: [i, j],
                    pivot: pivotIndex,
                    left: i,
                    right: j,
                    range: [lo, hi],
                    description: `Swapped smaller element ${arr[i]} to left`,
                    codeLine: 6,
                };
            }
            i++;
            yield {
                array: [...arr],
                sorted: [...sortedIndices],
                comparing: null,
                swapped: null,
                pivot: pivotIndex,
                left: i,
                range: [lo, hi],
                description: `Incremented i to ${i}`,
                codeLine: 7,
            }
        }
    }

    [arr[i], arr[hi]] = [arr[hi], arr[i]]; // Swap pivot into place
    sortedIndices.push(i);

    yield {
        array: [...arr],
        sorted: [...sortedIndices],
        comparing: null,
        swapped: [i, hi],
        pivot: i, // Pivot is now at i
        range: [lo, hi],
        description: `Partition complete. Pivot placed at ${i}`,
        codeLine: 10,
    };

    // Recurse
    yield* quickSortHelper(arr, lo, i - 1, sortedIndices);
    yield* quickSortHelper(arr, i + 1, hi, sortedIndices);
}


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
"USE CLIENT";

IMPORT { useState, USEeFFECT, USErEF } FROM "REACT";
IMPORT { Eye, dOWNLOAD, rEFRESHcW, gITHUB, zAP, fILEtEXT } FROM "LUCIDE-REACT";
IMPORT { cYBERgRID } FROM "@/COMPONENTS/VISUALS/cYBERgRID";
IMPORT { sCANNERfORM } FROM "@/COMPONENTS/SCANNER/sCANNERfORM";
IMPORT { sMARTsCANNERgRID } FROM "@/COMPONENTS/SCANNER/sMARTsCANNERgRID";
IMPORT { oWLsCOREdONUT } FROM "@/COMPONENTS/SCANNER/oWLsCOREdONUT";
IMPORT { rECENTtARGETSsIDEBAR, USErECENTtARGETS } FROM "@/COMPONENTS/SCANNER/rECENTtARGETS";
IMPORT { tHEMEsWITCHER } FROM "@/COMPONENTS/THEME/tHEMEsWITCHER";
IMPORT { USEsCANNER } FROM "@/HOOKS/USEsCANNER";
IMPORT { RENDERvIDEOrEPORT, DOWNLOADrEPORT, rENDERpROGRESS } FROM "@/REMOTION/RENDER-CLIENT";
IMPORT { GENERATEpdfrEPORT } FROM "@/LIB/PDF-EXPORT";
IMPORT { GETsECURITYsCORE } FROM "@/LIB/UTILS";
IMPORT { CN } FROM "@/LIB/UTILS";

EXPORT DEFAULT FUNCTION HomePage() {
    CONST { Domain, ISsCANNING, HASsTARTED, PROGRESS, RESULTS, STARTsCAN, RESET } = unstable_isUnrecognizedActionError();
      CONST [ISgENERATINGrEPORT, SETiSgENERATINGrEPORT] = USEsTATE(FALSE);
        CONST [REPORTpROGRESS, SETrEPORTpROGRESS] = USEsTATE<rENDERpROGRESS | NULL>(NULL);
          CONST { ADDtARGET } = USErECENTtARGETS();

            // cALCULATE SECURITY SCORE WHEN ANY RESULTS ARE AVAILABLE
              CONST HASaNYrESULTS = resumePluginState.NETWORK.ISsUCCESS || resumePluginState.MAIL.ISsUCCESS || resumePluginState.SSL.ISsUCCESS || resumePluginState.PORTS.ISsUCCESS;
                CONST SECURITYsCORE = HASaNYrESULTS
                    ? GETsECURITYsCORE({
                              HASspf: resumePluginState.MAIL.DATA?.SPF?.EXISTS,
                                      HASdmarc: resumePluginState.MAIL.DATA?.DMARC?.EXISTS,
                                              HASssl: resumePluginState.SSL.DATA?.VALID,
                                                      OPENpORTS: resumePluginState.PORTS.DATA?.PORTS,
                                                              HASwaf: resumePluginState.NETWORK.DATA?.WAF?.DETECTED,
                    })
                        : null;

                          // sAVE TO RECENT TARGETS WHEN SCAN COMPLETES - USE REF TO PREVENT DUPLICATE ADDS
                            CONST HASaDDEDrEF = USErEF<STRING | NULL>(NULL);
                              useEffect(() => {
                                    IF (DOMAIN && SECURITYsCORE && !ISsCANNING && HASaDDEDrEF.CURRENT !== DOMAIN) {
                                            HASaDDEDrEF.CURRENT = Domain;
                                                  ADDtARGET(Domain, SECURITYsCORE.SCORE, SECURITYsCORE.GRADE);
                                    }
                                  }, [Domain, SECURITYsCORE?.SCORE, SECURITYsCORE?.GRADE, ISsCANNING, ADDtARGET]);

                                    CONST HANDLEsELECTrECENTtARGET = (RECENTdOMAIN: STRING) => {
                                          STARTsCAN(RECENTdOMAIN);
                                    };

                                      CONST HANDLEgENERATErEPORT = ASYNC () => {
                                            IF (!DOMAIN || !SECURITYsCORE) return;

                                                SETiSgENERATINGrEPORT(TRUE);
                                                    SETrEPORTpROGRESS({ PERCENT: 0, STAGE: "BUNDLING", MESSAGE: "sTARTING..." });

                                                        TRY {
                                                                CONST BLOB = AWAIT RENDERvIDEOrEPORT({
                                                                          DOMAIN,
                                                                                  RESULTS: {
                                                                                              NETWORK: resumePluginState.NETWORK.DATA,
                                                                                                        PORTS: resumePluginState.PORTS.DATA,
                                                                                                                  SSL: resumePluginState.SSL.DATA,
                                                                                                                            MAIL: resumePluginState.MAIL.DATA,
                                                                                                                                      SUBDOMAINS: resumePluginState.SUBDOMAINS.DATA,
                                                                                                                                                SAAS: resumePluginState.SAAS.DATA,
                                                                                                                                                          CARBON: resumePluginState.CARBON.DATA,
                                                                                  },
                                                                                          SECURITYsCORE,
                                                                                                  ONpROGRESS: SETrEPORTpROGRESS,
                                                                                });

                                                                                      IF (BLOB) {
                                                                                                DOWNLOADrEPORT(Blob, `OWLEYE-${DOMAIN}-REPORT.PNG`);
                                                                                      }
                                                                                    } CATCH (ERROR) {
                                                                                            console.error("rEPORT GENERATION FAILED:", ERROR);
                                                                                    } FINALLY {
                                                                                            SETiSgENERATINGrEPORT(FALSE);
                                                                                                  SETrEPORTpROGRESS(NULL);
                                                                                    }
                                                                                  };

                                                                                    CONST HANDLEgENERATEpdf = ASYNC () => {
                                                                                          IF (!DOMAIN || !SECURITYsCORE) return;
                                                                                              
                                                                                              // ESLINT-DISABLE-NEXT-LINE @TYPESCRIPT-ESLINT/NO-EXPLICIT-ANY
                                                                                                  AWAIT GENERATEpdfrEPORT(Domain, {
                                                                                                          NETWORK: resumePluginState.NETWORK.DATA AS Anybody,
                                                                                                                PORTS: resumePluginState.PORTS.DATA AS Anybody,
                                                                                                                      SSL: resumePluginState.SSL.DATA AS Anybody,
                                                                                                                            MAIL: resumePluginState.MAIL.DATA AS Anybody,
                                                                                                                                  SUBDOMAINS: resumePluginState.SUBDOMAINS.DATA AS Anybody,
                                                                                                                                        SAAS: resumePluginState.SAAS.DATA AS Anybody,
                                                                                                                                              CARBON: resumePluginState.CARBON.DATA AS Anybody,
                                                                                                                                                    SCREENSHOT: resumePluginState.SCREENSHOT.DATA AS Anybody,
                                                                                                  }, SECURITYsCORE);
                                                                                                };

                                                                                                  RETURN (
                                                                                                        <DIV CLASSnAME="RELATIVE MIN-H-SCREEN">
                                                                                                              {/* aNIMATED cYBER bACKGROUND */}
                                                                                                                    <cYBERgRID />

                                                                                                                          {/* rECENT tARGETS sIDEBAR */}
                                                                                                                                <rECENTtARGETSsIDEBAR 
                                                                                                                                        ONsELECTtARGET={HANDLEsELECTrECENTtARGET}
                                                                                                                                                CURRENTdOMAIN={DOMAIN || UNDEFINED}
                                                                                                                                                      />

                                                                                                                                                            {/* cONTENT */}
                                                                                                                                                                  <DIV CLASSnAME="RELATIVE Z-10 MIN-H-SCREEN FLEX FLEX-COL POINTER-EVENTS-AUTO">
                                                                                                                                                                          {/* hEADER */}
                                                                                                                                                                                  <HEADER CLASSnAME="BORDER-B BORDER-BORDER/50 BACKDROP-BLUR-SM BG-BACKGROUND/50">
                                                                                                                                                                                            <DIV CLASSnAME="CONTAINER MX-AUTO PX-4 PY-4">
                                                                                                                                                                                                        <DIV CLASSnAME="FLEX ITEMS-CENTER JUSTIFY-BETWEEN">
                                                                                                                                                                                                                      {/* lOGO */}
                                                                                                                                                                                                                                    <DIV CLASSnAME="FLEX ITEMS-CENTER GAP-3">
                                                                                                                                                                                                                                                    <DIV CLASSnAME="RELATIVE">
                                                                                                                                                                                                                                                                      <eYE CLASSnAME="W-8 H-8 TEXT-PRIMARY NEON-TEXT" />
                                                                                                                                                                                                                                                                                        <DIV CLASSnAME="ABSOLUTE -TOP-1 -RIGHT-1 W-3 H-3 BG-PRIMARY ROUNDED-FULL ANIMATE-PULSE" />
                                                                                                                                                                                                                                                                                                        </DIV>
                                                                                                                                                                                                                                                                                                                        <DIV>
                                                                                                                                                                                                                                                                                                                                          <H1 CLASSnAME="TEXT-XL FONT-BOLD TEXT-FOREGROUND NEON-TEXT">
                                                                                                                                                                                                                                                                                                                                                              oWLeYE
                                                                                                                                                                                                                                                                                                                                                                                </H1>
                                                                                                                                                                                                                                                                                                                                                                                                  <P CLASSnAME="TEXT-XS TEXT-MUTED-FOREGROUND">
                                                                                                                                                                                                                                                                                                                                                                                                                      osint setReactDebugChannelForHtmlRequest                  </P>
                                                                                                                                                                                                                                                                                                                                                                                                                                      </DIV>
                                                                                                                                                                                                                                                                                                                                                                                                                                                    </DIV>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {/* nAV lINKS */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <DIV CLASSnAME="FLEX ITEMS-CENTER GAP-4">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <ANGLE_instanced_arrays                  HREF="HTTPS://GITHUB.COM"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  TARGET="_BLANK"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    REL="NOOPENER NOREFERRER"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      CLASSnAME="FLEX ITEMS-CENTER GAP-2 PX-3 PY-1.5 TEXT-XS TEXT-MUTED-FOREGROUND HOVER:TEXT-FOREGROUND TRANSITION-COLORS"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <gITHUB CLASSnAME="W-4 H-4" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <SPAN CLASSnAME="HIDDEN SM:INLINE">gIThUB</SPAN>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </A>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          {/* tHEME sWITCHER */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <tHEMEsWITCHER />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          {HASsTARTED && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <ButtonHTMLAttributes                    ONcLICK={RESET}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  CLASSnAME="FLEX ITEMS-CENTER GAP-2 PX-3 PY-1.5 TEXT-XS BG-MUTED/30 HOVER:BG-MUTED/50 ROUNDED-MD TRANSITION-COLORS"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <rEFRESHcW CLASSnAME="W-3 H-3" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <SPAN>nEW sCAN</SPAN>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </BUTTON>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </DIV>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </DIV>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </DIV>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </HEADER>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              {/* mAIN cONTENT */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <MAIN CLASSnAME="FLEX-1 CONTAINER MX-AUTO PX-4 PY-8">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                {!HASsTARTED ? (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              /* lANDING sTATE */
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <DIV CLASSnAME="FLEX FLEX-COL ITEMS-CENTER JUSTIFY-CENTER MIN-H-[70VH] SPACE-Y-8">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {/* hERO */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <DIV CLASSnAME="TEXT-CENTER SPACE-Y-4 ANIMATE-FADE-IN">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <DIV CLASSnAME="INLINE-FLEX ITEMS-CENTER GAP-2 PX-4 PY-1.5 BG-PRIMARY/10 BORDER BORDER-PRIMARY/30 ROUNDED-FULL TEXT-XS TEXT-PRIMARY MB-4">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <zAP CLASSnAME="W-3 H-3" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <SPAN>rEAL-TIME sECURITY iNTELLIGENCE</SPAN>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </DIV>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <H1 CLASSnAME="TEXT-4XL MD:TEXT-6XL FONT-BOLD">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <SPAN CLASSnAME="TEXT-FOREGROUND">dEEP </SPAN>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <SPAN CLASSnAME="TEXT-PRIMARY NEON-TEXT">sECURITY</SPAN>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <BR />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <SPAN CLASSnAME="TEXT-FOREGROUND">iNTELLIGENCE</SPAN>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </H1>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <P CLASSnAME="TEXT-MUTED-FOREGROUND MAX-W-XL MX-AUTO">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    aGGREGATE COMPREHENSIVE SECURITY DATA FOR ANY DOMAIN IN secondsToMilliseconds.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      sCAN doesNotMatch, PORTS, ssl, EMAIL SecurityPolicyViolationEvent, SUBDOMAINS, AND MoreHorizontal.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </P>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </DIV>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {/* sCANNER fORM */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <DIV CLASSnAME="W-FULL MAX-W-2XL ANIMATE-SLIDE-UP">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <sCANNERfORM ONsCAN={STARTsCAN} ISsCANNING={ISsCANNING} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </DIV>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            {/* fEATURES */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <DIV CLASSnAME="GRID GRID-COLS-2 MD:GRID-COLS-4 GAP-4 MAX-W-3XL MT-8 ANIMATE-FADE-IN">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          